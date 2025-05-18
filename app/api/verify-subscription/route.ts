import axios from 'axios';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

    // ✅ Use fetch properly here
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}api/subscriptions/verify`, {
        sessionId
      });
      

    const data = response.data;

    return NextResponse.json({data:data});
  } catch (error: any) {
    console.error('Error verifying subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
