// Interface for Testimonial data
export interface Testimonial {
  sys: {
    id: string
  }
  feedback: string
  name: string
  companyName: string
  feedbackerImage?: {
    url: string
    title: string
  } | null
}

// Interface for FAQ data
export interface FaqCategory {
  title: string
  description: string
  question: string[]
  answer: string[]
  sys: {
    id: string
  }
}

export interface FaqItem {
  question: string[]
  answer: string[]
  title?: string
  description?: string
}

// Interface for Pricing Plan data
export interface PricingPlan {
  title: string
  description: string
  price: number
  ctaText: string
  ctaLink: string
  highlightPlan: boolean
  features: string[]
  sys?: {
    id: string
  }
}

// Interface for About Us page data
export interface AboutUsPageData {
  image?: {
    url: string
    title: string
    description: string
  }
  title?: string
  description?: string
  features?: string[]
}

// Interface for Blog/News data
export interface BlogNewsItem {
  sys: {
    id: string
  }
  blogHeader: string
  blogImage?: {
    url: string
    title?: string
    description?: string
  }
  blogDate?: string
  blogContent?: string
  slug?: string
}

// Interface for Footer data
export interface Footer {
  sys?: {
    id: string
  }
  location?: string
  emailAddress?: string
  instagramLink?: string
  youtubeLink?: string
  facebookLink?: string
  twitterLink?: string
  description?: string
  workingHours?: string[]
  workingDays?: string[]
}

// Interface for Rich Text Content
export interface RichTextContent {
  nodeType?: string
  content?: Array<{
    nodeType?: string
    content?: Array<{
      nodeType?: string
      value?: string
      marks?: Array<any>
      data?: any
    }>
    data?: any
  }>
  data?: any
  json?: any
}

// Interface for Contact Page data
export interface ContactPageFields {
  location?: RichTextContent
  emailId?: RichTextContent
  cardTitle?: string
  cardDescription?: string
  map?: {
    lat: number
    lon: number
  }
}

// Interface for Hero Section data
export interface HeroSection {
  sys?: {
    id: string
  }
  pageTitle: string
  pageDescription: string
  pageImage?: {
    url: string
    title: string
    description?: string
  }
}

// Interface for Hero Slide
export interface HeroSlide {
  title: string
  highlightWord: string
  description: string
  buttonText: string
  image: string
}

// Interface for Service data
export interface ServiceItem {
  sys: {
    id: string
  }
  title: string
  slug: string
  description: string
  icon?: {
    url: string
    title: string
    description?: string
  }
  price?: string
  duration?: string
  features?: string[]
  content?: string
}

// Interface for About Us Section data
export interface AboutUsSection {
  sys?: {
    id: string
  }
  title: string
  description: string
  numericalData: string[]
  numericalDataDescription: string[]
  image?: {
    url: string
    title: string
    description?: string
  }
}

// Interface for CTA Section data
export interface CtaSection {
  sys?: {
    id: string
  }
  title?: RichTextContent
  description?: RichTextContent
  backgroundImage?: {
    url: string
    title: string
    description?: string
  }
  link?: RichTextContent
}

// Interface for Service Page data
export interface ServicePage {
  sys?: {
    id: string
  }
  icon?: {
    url: string
    title: string
    description?: string
  }
  title: string
  description: string
  serviceDetailsPage?: Array<{
    sys: {
      id: string
    }
    fields?: any
  }>
}

// Interface for Tax Service data (for Tax-section component)
export interface TaxService {
  sys?: {
    id: string
  }
  icon?: {
    url: string
    title: string
    description?: string
  }
  title: string
  description: string
  highlighted?: boolean
}

// Interface for Service Section data
export interface ServiceSection {
  sys?: {
    id: string
  }
  title?: string
  description?: string
  cardIcon?: Array<{
    url: string
    title: string
    description?: string
  }>
  cardTitle?: string[]
  cardDescription?: string[]
  cardLink?: string[]
}

// Interface for Features Section data
export interface FeaturesSection {
  sys?: {
    id: string
  }
  title?: string
  cardTitle?: string[]
  cardDescription?: string[]
  cardIcon?: Array<{
    url: string
    title: string
    description?: string
  }>
}

// Interface for Service Details Page data
export interface ServiceDetailsPage {
  sys?: {
    id: string
  }
  title: string
  description: string
  image?: {
    url: string
    title?: string
    description?: string
  }
  whatWeOffer: string[]
  price: number
} 