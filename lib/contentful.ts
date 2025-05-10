// lib/contentful.ts
import {
  Testimonial,
  FaqCategory,
  FaqItem,
  PricingPlan,
  AboutUsPageData,
  ServiceItem,
  HeroSection,
  HeroSlide,
  ServicePage,
  TaxService,
  ServiceSection,
  FeaturesSection,
  ServiceDetailsPage,
  BlogNewsItem,
  Footer,
  RichTextContent
} from './contentful-types';

// Add ColorSchema type
type ColorSchema = {
  sys: {
    id: string;
  };
  primaryColor: string;
  secondaryColor: string;
};

// Update the ImageSection type
type ImageSection = {
  sys: { id: string };
  images: {
    url: string;
    title: string;
    description?: string;
  }[];
};

// Update the ContactPageFields type
type ContactPageFields = {
  location?: RichTextContent;
  emailId?: RichTextContent;
  cardTitle?: string;
  cardDescription?: string;
  map?: {
    lat: number;
    lon: number;
  };
  image?: {
    url: string;
    title: string;
    description?: string;
  };
};

// Function to fetch data using GraphQL
async function fetchGraphQL(query: string) {
  const SPACE_ID=process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  const ACCESS_TOKEN=process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      cache: "no-store"
    }
  ).then((response) => response.json());
}

// Function to fetch testimonials from Contentful
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const query = `
      query {
        testimonialSectionCollection {
          items {
            sys {
              id
            }
            feedback
            name
            companyName
            feedbackerImage {
              url
              title
            }
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.testimonialSectionCollection?.items) {
      return response.data.testimonialSectionCollection.items;
    }
    
    throw new Error('No testimonials found');
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [
      {
        sys: { id: 'fallback-1' },
        feedback: 'Working with CLCK Accounting has been a game-changer for our small business. Their meticulous attention to detail and proactive tax planning have saved us thousands.',
        name: 'Sarah Laura',
        companyName: 'CEO of Pluz Company',
        feedbackerImage: null
      },
      {
        sys: { id: 'fallback-2' },
        feedback: 'CLCK Bookkeeping transformed our financial operations. Their team is responsive, professional, and incredibly knowledgeable.',
        name: 'Jessica Miller',
        companyName: 'Operations Director',
        feedbackerImage: null
      }
    ];
  }
}

// Function to fetch FAQs from Contentful
export async function fetchFAQs(): Promise<FaqItem[]> {
  try {
    const query = `
      query {
        faqCategoryCollection {
          items {
            sys {
              id
            }
            title
            description
            question
            answer
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.faqCategoryCollection?.items) {
      // Transform data to our format
      return response.data.faqCategoryCollection.items.map((faq: FaqCategory) => ({
        question: Array.isArray(faq.question) ? faq.question : [faq.question],
        answer: faq.answer, // Now a single text field, not an array
        title: faq.title,
        description: faq.description
      }));
    }
    
    throw new Error('No FAQs found');
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [
      {
        question: ["What services do we clck booking offer?"],
        answer: "Fusce mattis dui aliquam dui consectetur et eleifend eros elit. Donec at accumsa ligula. Cras vulputate nunc vitae quam lorem ipsm dolor sit amet.",
      },
      {
        question: ["How do I choose the right accounting firm for my business?"],
        answer: "When choosing an accounting firm, consider their expertise in your industry, range of services, reputation, communication style, and fee structure.",
      },
      {
        question: ["What Service Do You Offer?"],
        answer: "We offer comprehensive bookkeeping, tax preparation, financial reporting, payroll management, business advisory, and audit services.",
      },
      {
        question: ["What qualifications should I look for in an accounting firm?"],
        answer: "Look for proper certifications (CPA, ACCA), industry experience, continuing education, and a good reputation. The firm should stay current with tax laws.",
      },
      {
        question: ["What can we do to add services?"],
        answer: "To add services to your account, contact our support team or use the client portal. We'll provide a customized quote.",
      },
      {
        question: ["Should I look for in an accounting firm?"],
        answer: "Prioritize expertise in your industry, range of services offered, communication style, and technology adoption.",
      },
      {
        question: ["What Is The Accounting Cycle?"],
        answer: "The accounting cycle includes recording transactions, posting to the general ledger, adjusting entries, preparing financial statements, and closing the books.",
      }
    ];
  }
}

// Function to fetch pricing plans from Contentful
export async function fetchPricingPlans(): Promise<PricingPlan[]> {
  try {
    const query = `
      query {
        pricingPlanCollection {
          items {
            sys {
              id
            }
            title
            description
            price
            ctaText
            ctaLink
            highlightPlan
            features
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.pricingPlanCollection?.items) {
      return response.data.pricingPlanCollection.items.map((item: any) => ({
        title: item.title || "Unnamed Plan",
        description: item.description || "",
        price: typeof item.price === 'number' ? item.price : 0,
        ctaText: item.ctaText || "Get Started",
        ctaLink: item.ctaLink || "/contact-us",
        highlightPlan: !!item.highlightPlan,
        features: Array.isArray(item.features) ? item.features : [],
        sys: item.sys
      }));
    }
    
    throw new Error('No pricing plans found');
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return [
      {
        title: "Basic",
        description: "Perfect for sole traders and small businesses just starting out.",
        price: 67,
        ctaText: "Get Started",
        ctaLink: "/contact-us",
        highlightPlan: false,
        features: [
          "1x Self-Assessment",
          "Monthly Digital Bookkeeping Licence",
          "Quarterly Bookkeeping",
          "Profit & Loss Account"
        ]
      },
      {
        title: "Enterprise",
        description: "Ideal for growing businesses with more complex financial needs.",
        price: 99,
        ctaText: "Get Started",
        ctaLink: "/contact-us",
        highlightPlan: true,
        features: [
          "All the benefits of Basic",
          "Monthly Bookkeeping",
          "VAT Returns",
          "Educational subscription Access"
        ]
      },
      {
        title: "Professional",
        description: "Comprehensive solution for established businesses requiring full financial support.",
        price: 167,
        ctaText: "Get Started",
        ctaLink: "/contact-us",
        highlightPlan: false,
        features: [
          "All the benefits of Enterprise",
          "FRS 105",
          "Corporation Tax",
          "Quarterly 1-hour video meetings"
        ]
      }
    ];
  }
}

// Function to fetch about us page data from Contentful
export async function fetchAboutUsData(): Promise<AboutUsPageData> {
  try {
    const query = `
      query {
        aboutUsPageCollection(limit: 1) {
          items {
            image {
              url
              title
              description
            }
            title
            description
            features
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.aboutUsPageCollection?.items?.length > 0) {
      const pageData = response.data.aboutUsPageCollection.items[0];
      
      return {
        image: pageData.image ? {
          url: pageData.image.url,
          title: pageData.image.title,
          description: pageData.image.description 
        } : undefined,
        title: pageData.title || "We are an Award-Winning Accountancy practice with 20+ Years of Expertise",
        description: pageData.description || "At CLCK Bookkeeping-Taxation, we are more than just another accountancy firm—we are your trusted outsourced finance department with a skilled approach to accessible communication skills in deafness and neurodiversity and use accessible language that you can understand.",
        features: pageData.features || [
          "With over 20 years of experience both lived and advised, in both industry and practice, we have built a solid reputation for delivering first-class customer experience and expert financial support.",
          "Our award-winning team is dedicated to providing tailored solutions that meet the unique needs of small to medium-sized businesses and individuals based in the UK.",
          "We support many who have struggled to understand the labyrinth of access and issues that can come with deafness and neurodiverse understanding.",
          "Unlike larger firms where clients can feel like just another number, we stand out by giving you the time & attention you deserve.",
          "Our commitment is to help you streamline your finances so you can focus on what matters most—growing and developing your business."
        ]
      };
    }
    
    throw new Error('No about us page data found');
  } catch (error) {
    console.error('Error fetching about us data:', error);
    return {
      title: "We are an Award-Winning Accountancy practice with 20+ Years of Expertise",
      description: "At CLCK Bookkeeping-Taxation, we are more than just another accountancy firm—we are your trusted outsourced finance department with a skilled approach to accessible communication skills in deafness and neurodiversity and use accessible language that you can understand.",
      features: [
        "With over 20 years of experience both lived and advised, in both industry and practice, we have built a solid reputation for delivering first-class customer experience and expert financial support.",
        "Our award-winning team is dedicated to providing tailored solutions that meet the unique needs of small to medium-sized businesses and individuals based in the UK.",
        "We support many who have struggled to understand the labyrinth of access and issues that can come with deafness and neurodiverse understanding.",
        "Unlike larger firms where clients can feel like just another number, we stand out by giving you the time & attention you deserve.",
        "Our commitment is to help you streamline your finances so you can focus on what matters most—growing and developing your business."
      ]
    };
  }
}

// Function to fetch services data from Contentful
export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const query = `
      query {
        serviceCollection {
          items {
            sys {
              id
            }
            title
            slug
            description
            price
            duration
            icon
            image {
              url
              title
              description
            }
            features
            content
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.serviceCollection?.items) {
      return response.data.serviceCollection.items;
    }
    
    throw new Error('No services found');
  } catch (error) {
    console.error('Error fetching services:', error);
    return [
      {
        sys: { id: 'fallback-1' },
        title: "Power Hour",
        slug: "power-hour",
        description: "Tell us your needs, and we will do all the research for you and have a 1-hour chat so you can be on your way to doing your accounts.",
        price: "£300",
        duration: "1 Hour",
        icon: { url: "", title: "clock" }
      },
      {
        sys: { id: 'fallback-2' },
        title: "Support",
        slug: "support",
        description: "This is a block of support per hour to help you with the bookkeeping and running of your company, for regular clients only.",
        price: "£99",
        duration: "1 Hour",
        icon: { url: "", title: "users" }
      },
      {
        sys: { id: 'fallback-3' },
        title: "Training",
        slug: "training",
        description: "Professional training services to help you and your team understand and manage your financial accounts effectively.",
        price: "£450",
        duration: "Day",
        icon: { url: "", title: "graduation-cap" }
      }
    ];
  }
}

// Function to fetch contact page data from Contentful
export async function fetchContactPageData(): Promise<ContactPageFields> {
  try {
    const query = `
      query {
        contactUsPageCollection(limit: 1) {
          items {
            location {
              json
            }
            emailId {
              json
            }
            cardTitle
            cardDescription
            map {
              lat
              lon
            }
            image {
              url
              title
              description
            }
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data && 
        response.data.contactUsPageCollection && 
        response.data.contactUsPageCollection.items && 
        response.data.contactUsPageCollection.items.length > 0) {
      
      const page = response.data.contactUsPageCollection.items[0];
      
      return {
        location: page.location?.json || undefined,
        emailId: page.emailId?.json || undefined,
        cardTitle: page.cardTitle || "Get in Touch With Us",
        cardDescription: page.cardDescription || "We're here to help with any questions about our services.",
        map: page.map || { lat: 51.5074, lon: -0.1278 },
        image: page.image ? {
          url: page.image.url,
          title: page.image.title,
          description: page.image.description
        } : undefined
      };
    }
    
    throw new Error('No contact page data found');
  } catch (error) {
    console.error('Error fetching contact page data:', error);
    return {
      location: undefined,
      emailId: undefined,
      cardTitle: "Get in Touch With Us",
      cardDescription: "We're here to help with any questions about our services.",
      map: { lat: 51.5074, lon: -0.1278 },
      image: {
        url: "/human.jpg",
        title: "Customer support"
      }
    };
  }
}

// Function to fetch hero section data from Contentful
export async function fetchHeroSectionData(): Promise<HeroSlide[]> {
  try {
    const query = `
      query {
        heroSectionCollection {
          items {
            sys {
              id
            }
            pageTitle
            pageDescription
            pageImage {
              url
              title
              description
            }
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.heroSectionCollection?.items?.length > 0) {
      const heroItems = response.data.heroSectionCollection.items;
      const slides: HeroSlide[] = [];
      
      // Create slides from each item in the collection
      for (const item of heroItems) {
        if (item.pageTitle && item.pageDescription && item.pageImage) {
          const title = item.pageTitle;
          // Find a word to highlight (default to the first word that's at least 4 characters)
          const words = title.split(' ');
          const highlightWord = words.find((word: string) => word.length >= 4) || words[0] || 'Services';
          
          slides.push({
            title: title,
            highlightWord: highlightWord,
            description: item.pageDescription,
            buttonText: "Get Started Now",
            image: item.pageImage.url
          });
        }
      }
      
      return slides;
    }
    
    throw new Error('No hero section data found');
  } catch (error) {
    console.error('Error fetching hero section data:', error);
    // Return default hero slides if API fails
    return [
      {
        title: "Simplify Your Finances with Secure Bookkeeping & Tax Services",
        highlightWord: "Finances",
        description: "Manage your bookkeeping and taxes effortlessly with our modern, secure, and user-friendly platform. Access financial tools, secure document storage, and exclusive resources designed for individuals and businesses.",
        buttonText: "Get Started Now",
        image: "/s.png.jpg"
      },
      {
        title: "Streamline Your Tax Preparation with Expert Tools",
        highlightWord: "Tax",
        description: "Manage your bookkeeping and taxes effortlessly with our modern, secure, and user-friendly platform. Access financial tools, secure document storage, and exclusive resources designed for individuals and businesses.",
        buttonText: "Get Started Now",
        image: "/st.png.jpg"
      },
      {
        title: "Secure Document Management for Financial Peace",
        highlightWord: "Document",
        description: "Manage your bookkeeping and taxes effortlessly with our modern, secure, and user-friendly platform. Access financial tools, secure document storage, and exclusive resources designed for individuals and businesses.",
        buttonText: "Get Started Now",
        image: "/se.png.jpg"
      }
    ];
  }
}

// Function to fetch Service Page data from Contentful
export async function fetchServicePageData(): Promise<ServicePage[]> {
  try {
    const query = `
      query {
        servicePageCollection {
          items {
            sys {
              id
            }
            title
            description
            icon {
              url
              title
              description
            }
            serviceDetailsPageCollection {
              items {
                sys {
                  id
                }
              }
            }
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.servicePageCollection?.items) {
      return response.data.servicePageCollection.items.map((item: any) => ({
        sys: item.sys,
        title: item.title || "",
        description: item.description || "",
        icon: item.icon ? {
          url: item.icon.url,
          title: item.icon.title,
          description: item.icon.description
        } : undefined,
        serviceDetailsPage: item.serviceDetailsPageCollection?.items || []
      }));
    }
    
    throw new Error('No service pages found');
  } catch (error) {
    console.error('Error fetching service pages:', error);
    return [
      {
        sys: { id: 'fallback-1' },
        title: "Bookkeeping Services",
        description: "Comprehensive bookkeeping services to help you maintain accurate financial records for your business.",
        icon: {
          url: "/icons/bookkeeping.png",
          title: "Bookkeeping Services"
        }
      },
      {
        sys: { id: 'fallback-2' },
        title: "Tax Services",
        description: "Professional tax services to help you navigate the complex tax landscape and optimize your tax position.",
        icon: {
          url: "/icons/tax.png",
          title: "Tax Services"
        }
      },
      {
        sys: { id: 'fallback-3' },
        title: "Financial Advisory",
        description: "Expert financial guidance and advisory services to help you make informed financial decisions.",
        icon: {
          url: "/icons/advisory.png",
          title: "Financial Advisory"
        }
      }
    ];
  }
}

// Function to fetch about us section data
export async function fetchAboutUsSectionData() {
  try {
    const query = `
      query {
        aboutUsSectionCollection(limit: 1) {
          items {
            sys {
              id
            }
            title
            description
            numericalData
            numericalDataDescription
            image {
              url
              title
              description
            }
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.aboutUsSectionCollection?.items?.length > 0) {
      return response.data.aboutUsSectionCollection.items[0];
    }
    
    throw new Error('No about us section data found');
  } catch (error) {
    console.error('Error fetching about us section data:', error);
    return {
      title: "About CLCK Accounting",
      description: "We are more than just an accounting firm. We are your financial partners dedicated to your success.",
      numericalData: ["20+", "500+", "98%"],
      numericalDataDescription: ["Years Experience", "Satisfied Clients", "Client Retention"]
    };
  }
}

// Function to fetch CTA section data
export async function fetchCtaSectionData() {
  try {
    const query = `
      query {
        ctaSectionCollection(limit: 1) {
          items {
            sys {
              id
            }
            title
            description
            backgroundImage {
              url
              title
              description
            }
            link {
              json
            }
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.ctaSectionCollection?.items?.length > 0) {
      return response.data.ctaSectionCollection.items[0];
    }
    
    throw new Error('No CTA section data found');
  } catch (error) {
    console.error('Error fetching CTA section data:', error);
    return {
      title: "Ready to take control of your finances?",
      description: "Let our expert team help you navigate the financial aspects of your business so you can focus on what matters most.",
      backgroundImage: null,
      link: {
        json: {
          content: [{
            content: [{
              value: "Contact Us"
            }]
          }]
        }
      }
    };
  }
}

// Function to fetch Service Section data from Contentful
export async function fetchServiceSectionData(): Promise<ServiceSection> {
  try {
    const query = `
      query {
        serviceSectionCollection(limit: 1) {
          items {
            sys {
              id
            }
            title
            description
            cardTitle
            cardDescription
            cardLink
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    if (response.data?.serviceSectionCollection?.items?.length > 0) {
      return response.data.serviceSectionCollection.items[0];
    }
    
    throw new Error('No service section data found');
  } catch (error) {
    console.error('Error fetching service section data:', error);
    return {
      sys: { id: 'fallback-service-section' },
      title: "Our Comprehensive Service Offerings",
      description: "We provide a wide range of professional services to help you manage and grow your business.",
      cardIcon: [
        { url: "/icons/bookkeeping.png", title: "Bookkeeping" },
        { url: "/icons/tax.png", title: "Tax Services" },
        { url: "/icons/advisory.png", title: "Advisory" },
        { url: "/icons/payroll.png", title: "Payroll" }
      ],
      cardTitle: [
        "Bookkeeping Services",
        "Tax Services",
        "Financial Advisory",
        "Payroll Management"
      ],
      cardDescription: [
        "Maintain accurate and up-to-date financial records with our comprehensive bookkeeping services.",
        "Navigate complex tax regulations with our expert tax preparation and planning services.",
        "Make informed financial decisions with our strategic advisory services.",
        "Simplify your payroll process with our efficient and accurate payroll management services."
      ],
      cardLink: [
        "/services/bookkeeping",
        "/services/tax",
        "/services/advisory",
        "/services/payroll"
      ]
    };
  }
}

// Function to fetch features section data from Contentful
export async function fetchFeaturesSectionData(): Promise<FeaturesSection> {
  try {
    const query = `
      query {
        featuresSectionCollection(limit: 1) {
          items {
            sys {
              id
            }
            title
            cardTitle
            cardDescription
            cardIcon {
              url
              title
              description
            }
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.featuresSectionCollection?.items?.length > 0) {
      return response.data.featuresSectionCollection.items[0];
    }
    
    throw new Error('No features section data found');
  } catch (error) {
    console.error('Error fetching features section data:', error);
    return {
      sys: { id: 'fallback-features-section' },
      title: "Our Customer Platform Everyone's Business",
      cardTitle: [
        "Stress-Free Taxes",
        "Secure & Smart",
        "Exclusive Perks"
      ],
      cardDescription: [
        "Our system automates bookkeeping and tax processes, keeping your records accurate and up to date with minimal effort.",
        "Our platform ensures secure document management, easy navigation, and accessibility for a seamless experience.",
        "Gain access to expert resources, secure storage, and one-on-one consultations. Our private members' area offers exclusive content to keep your finances in check."
      ],
      cardIcon: [
        { url: "../Banknote copy.png", title: "Banknote" },
        { url: "../Shield copy.png", title: "Shield" },
        { url: "../Pie Chart copy.png", title: "Pie Chart" }
      ]
    };
  }
}

// Function to fetch Service Details Page data from Contentful
export async function fetchServiceDetailsPage(id: string): Promise<ServiceDetailsPage> {
  try {
    const query = `
      query {
        serviceDetailsPage(id: "${id}") {
          sys {
            id
          }
          title
          description
          image {
            url
            title
            description
          }
          whatWeOffer
          price
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.serviceDetailsPage) {
      const data = response.data.serviceDetailsPage;
      return {
        sys: data.sys,
        title: data.title || "",
        description: data.description || "",
        image: data.image ? {
          url: data.image.url,
          title: data.image.title,
          description: data.image.description
        } : undefined,
        whatWeOffer: Array.isArray(data.whatWeOffer) ? data.whatWeOffer : [],
        price: typeof data.price === 'number' ? data.price : 0
      };
    }
    
    throw new Error('Service details page not found');
  } catch (error) {
    console.error('Error fetching service details page:', error);
    return {
      sys: { id: 'fallback-service-details' },
      title: "Service Not Found",
      description: "We couldn't find the service details you're looking for. Please try another service or contact us for assistance.",
      whatWeOffer: [],
      price: 0
    };
  }
}

// Function to fetch all Service Details Pages from Contentful
export async function fetchAllServiceDetailsPages(): Promise<ServiceDetailsPage[]> {
  try {
    const query = `
      query {
        serviceDetailsPageCollection {
          items {
            sys {
              id
            }
            title
            description
            image {
              url
              title
            }
            whatWeOffer
            price
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.serviceDetailsPageCollection?.items) {
      return response.data.serviceDetailsPageCollection.items;
    }
    
    throw new Error('No service details pages found');
  } catch (error) {
    console.error('Error fetching service details pages:', error);
    return [];
  }
}

// Function to fetch all blog/news items from Contentful
export async function fetchBlogNewsItems(): Promise<BlogNewsItem[]> {
  try {
    const query = `
      query {
        blognewsSectionCollection {
          items {
            sys {
              id
            }
            blogHeader
            blogImage {
              url
              title
              description
            }
            blogDate
            blogContent
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.blognewsSectionCollection?.items) {
      // Process and add slugs based on the title
      return response.data.blognewsSectionCollection.items.map((item: any) => ({
        ...item,
        slug: item.blogHeader ? slugify(item.blogHeader) : `blog-${item.sys.id}`
      }));
    }
    
    throw new Error('No blog/news items found');
  } catch (error) {
    console.error('Error fetching blog/news items:', error);
    // Return fallback data
    return [
      {
        sys: { id: 'fallback-1' },
        blogHeader: "Bookkeeping 101: Why Keeping Track of Your Finances Matters",
        blogDate: "2024-07-02",
        blogContent: "The Key Laboratory of Oolong Tea Processing Technology of the Ministry of Agriculture and Rural Affairs is an important carrier for the innovative development of Bama Tea Industry.",
        slug: "bookkeeping-101"
      },
      {
        sys: { id: 'fallback-2' },
        blogHeader: "Common Tax Mistakes and How to Avoid Them",
        blogDate: "2024-07-02",
        blogContent: "With the goal of enhancing independent innovation capabilities, focusing on tea industry technology research and integration transformation.",
        slug: "tax-mistakes"
      },
      {
        sys: { id: 'fallback-3' },
        blogHeader: "How Digital Bookkeeping Makes Financial Management Easier",
        blogDate: "2024-07-02",
        blogContent: "Improving infrastructure and equipment levels, consolidating the foundation of enterprise application research.",
        slug: "digital-bookkeeping"
      }
    ];
  }
}

// Function to fetch a single blog/news item by slug
export async function fetchBlogNewsItemBySlug(slug: string): Promise<BlogNewsItem | null> {
  try {
    // First fetch all items
    const allItems = await fetchBlogNewsItems();
    
    // Find the item with matching slug
    const item = allItems.find(item => item.slug === slug);
    
    if (item) {
      return item;
    }
    
    throw new Error(`Blog item with slug ${slug} not found`);
  } catch (error) {
    console.error(`Error fetching blog item with slug ${slug}:`, error);
    return null;
  }
}

// Function to fetch footer data from Contentful
export async function fetchFooterData(): Promise<Footer> {
  try {
    const query = `
      query {
        footerCollection(limit: 1) {
          items {
            sys {
              id
            }
            location
            emailAddress
            instagramLink
            linkedinLink
            facebookLink
            twitterLink
            description
            workingHours
            workingDays
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.footerCollection?.items?.length > 0) {
      return response.data.footerCollection.items[0];
    }
    
    throw new Error('No footer data found');
  } catch (error) {
    console.error('Error fetching footer data:', error);
    // Return fallback data
    return {
      location: "CLCK Bookkeeping-Taxation, 29 South view, Austerfield Doncaster\nSouth Yorkshire, DN106QR",
      emailAddress: "hello@cooper-king.com",
      instagramLink: "#",
      linkedinLink: "#",
      facebookLink: "#",
      twitterLink: "#",
      description: "At CLCK Bookkeeping-Taxation, we are more than just another accountancy firm—we are your trusted outsourced finance department with a skilled approach to accessible communication skills in deafness and neurodiversity and use accessible language that you can understand.",
      workingHours: ["12:00 PM - 14:45 PM", "17:30 PM - 00:00 AM", "17:30 PM - 00:00 AM"],
      workingDays: ["Mon-Sat", "Sat-Thu", "Fri-Sat"],
      termsAndConditionsLink: "/terms-and-conditions",
      privacyPolicyLink: "/privacy-policy",
      cookiesPolicyLink: "/cookies-policy"
    };
  }
}

// Helper function to create URL-friendly slugs
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Update the fetchImagesSectionData function
export async function fetchImagesSectionData(): Promise<ImageSection[]> {
  try {
    const query = `
      query {
        imagesSectionCollection {
          items {
            sys {
              id
            }
            imagesCollection {
              items {
                url
                title
                description
                }
            }
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    if (response.data.imagesSectionCollection.items[0].imagesCollection.items) {
      return response.data.imagesSectionCollection.items[0].imagesCollection.items;
    }
    
    throw new Error('No images section data found');
  } catch (error) {
    console.error('Error fetching images section data:', error);
    return [
      {
        sys: { id: 'fallback-1' },
        images: [
          {
            url: "/prize.jpg",
            title: "Award"
          },
          {
            url: "/crest.jpg",
            title: "Crest"
          }
        ]
      }
    ];
  }
}

// Function to fetch color schema from Contentful
export async function fetchColorSchema() {
  try {
    const query = `
      query {
        colorSchemaCollection(limit: 1) {
          items {
            sys {
              id
            }
            primaryColor
            secondaryColor
          }
        }
      }
    `;
    
    const response = await fetchGraphQL(query);
    
    if (response.data?.colorSchemaCollection?.items?.length > 0) {
      return response.data.colorSchemaCollection.items[0];
    }
    
    throw new Error('No color schema found');
  } catch (error) {
    console.error('Error fetching color schema:', error);
    // Return default colors if API fails
    return {
      sys: { id: 'default-colors' },
      primaryColor: '#2E3B5B',
      secondaryColor: '#EFD588'
    };
  }
}
