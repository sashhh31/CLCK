import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const PRICE_IDS = {
  Basic: 'price_1RPdG7BZO6T3Rh80XaFMJ0mZ',
  Professional: 'price_1RPdWOBZO6T3Rh807XqUKcVC',
  Enterprise: 'price_1RPdWdBZO6T3Rh80zMc2axCG'
};

export async function POST(req: Request) {
  try {
    const { planName, email } = await req.json();

    const priceId = PRICE_IDS[planName as keyof typeof PRICE_IDS];
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Get user's Stripe customer ID from backend
    const userResponse = await axios.post(`http://localhost:3000/api/users/me`, {email},{
      headers: {
        'Cookie': req.headers.get('cookie') || ''
      }
    });
    if (!userResponse.data.data.user.subscription.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No Stripe customer ID found for this user' },
        { status: 400 }
      );
    }

    // Create a checkout session with existing customer
    const session = await stripe.checkout.sessions.create({
      customer: userResponse.data.data.user.subscription.stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/plans?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/plans`,
      metadata: {
        plan: planName
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 