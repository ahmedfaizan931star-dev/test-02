import { Product, Order, ThemeSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Aura Horizon Acoustic Headphones',
    subtitle: 'Spatial Audio with Active Noise Neutralization',
    description: 'Masterfully crafted wireless headphones featuring custom 40mm beryllium drivers, active spatial sound stage, and 45-hour ultra-endurance battery life. Ergonomic memory foam earcups encased in lambskin leather.',
    price: 349,
    originalPrice: 399,
    category: 'Audio',
    brand: 'AURA Studio',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 28,
    rating: 4.9,
    reviewCount: 142,
    isFeatured: true,
    isNew: true,
    tags: ['Best Seller', 'Spatial Audio', 'Wireless'],
    variants: [
      { id: 'v1', name: 'Matte Obsidian', colorHex: '#18181b', inStock: true },
      { id: 'v2', name: 'Titanium Silver', colorHex: '#d4d4d8', inStock: true },
      { id: 'v3', name: 'Desert Copper', colorHex: '#b45309', inStock: true }
    ],
    specs: {
      'Driver Size': '40mm Beryllium Dynamic',
      'Frequency Response': '10Hz - 48,000Hz',
      'Battery Life': 'Up to 45 hours (ANC On)',
      'Connectivity': 'Bluetooth 5.3 + Lossless 2.4GHz',
      'Weight': '270 grams'
    },
    reviews: [
      {
        id: 'r1',
        userName: 'Alexander V.',
        rating: 5,
        date: '2 days ago',
        title: 'Unbelievable Soundstage',
        comment: 'The clarity across the highs and lows is astonishing. I hear nuances in orchestral tracks I never noticed before.',
        verifiedPurchase: true
      },
      {
        id: 'r2',
        userName: 'Elena R.',
        rating: 5,
        date: '1 week ago',
        title: 'Luxurious Comfort',
        comment: 'Wore these for an 11-hour flight. Zero pressure points and the noise cancellation is top tier.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Aura Sphere Studio Speaker',
    subtitle: 'Acoustic Precision for Modern Spaces',
    description: 'Sculptural wireless speaker with 360-degree omnidirectional sound projection, room-adapting acoustic correction, and seamless Wi-Fi streaming.',
    price: 599,
    originalPrice: 649,
    category: 'Audio',
    brand: 'AURA Studio',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 14,
    rating: 4.8,
    reviewCount: 88,
    isFeatured: true,
    isNew: false,
    tags: ['Hi-Fi', 'AirPlay 2', 'Room Calibration'],
    variants: [
      { id: 'v2-1', name: 'Monolith Grey', colorHex: '#3f3f46', inStock: true },
      { id: 'v2-2', name: 'Nordic Birch', colorHex: '#fef08a', inStock: true }
    ],
    specs: {
      'Peak Power': '240W Class-D Amplification',
      'Microphones': 'Beamforming Acoustic Calibration',
      'Inputs': 'Wi-Fi, Bluetooth 5.2, Optical, AUX 3.5mm',
      'Dimensions': '240mm x 240mm x 280mm'
    },
    reviews: [
      {
        id: 'r3',
        userName: 'Marcus K.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Fills the room effortless',
        comment: 'Looks like a piece of modern sculpture in my living room and sounds like a live concert.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'Chronos Minimalist Smartwatch',
    subtitle: 'Sapphire Crystal & Health Telemetry Engine',
    description: 'Ultra-thin titanium smartwatch with perpetual AMOLED display, ECG monitoring, heart-rate variability analytics, and 10-day active battery life.',
    price: 289,
    category: 'Wearables',
    brand: 'Chronos',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.7,
    reviewCount: 210,
    isFeatured: true,
    isNew: true,
    tags: ['Titanium', 'Waterproof 50m', 'Health Metrics'],
    variants: [
      { id: 'v3-1', name: 'Midnight Titanium', colorHex: '#09090b', inStock: true },
      { id: 'v3-2', name: 'Alpine White Silicone', colorHex: '#f4f4f5', inStock: true },
      { id: 'v3-3', name: 'Saddle Leather', colorHex: '#9a3412', inStock: true }
    ],
    specs: {
      'Case Material': 'Grade 5 Aerospace Titanium',
      'Display': '1.43" Retina AMOLED with Sapphire Glass',
      'Sensors': 'ECG, PPG, SpO2, Temperature, Gyroscope',
      'Water Resistance': '5 ATM / 50 meters'
    },
    reviews: []
  },
  {
    id: 'prod-4',
    title: 'Lumina Ambient Smart Lamp',
    subtitle: 'Circadian Dynamic Light Sculpture',
    description: 'Anodized aluminum table light engineered to mirror natural sun cycles from dawn to dusk. Touch gesture control and app automation.',
    price: 179,
    originalPrice: 199,
    category: 'Smart Home',
    brand: 'Lumina',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 32,
    rating: 4.6,
    reviewCount: 64,
    isFeatured: false,
    isNew: false,
    tags: ['Circadian Light', 'Touch Control', 'Matter Compatible'],
    variants: [
      { id: 'v4-1', name: 'Brushed Brass', colorHex: '#ca8a04', inStock: true },
      { id: 'v4-2', name: 'Anodized Black', colorHex: '#18181b', inStock: true }
    ],
    specs: {
      'Brightness': '1200 Lumens Peak',
      'Color Temp': '1800K - 6500K Continuous',
      'Control': 'Capacitive Touch Touchpad & App'
    },
    reviews: []
  },
  {
    id: 'prod-5',
    title: 'Precision Wireless Charging Pad',
    subtitle: 'Machined Aluminum 3-in-1 Power Hub',
    description: 'Charge phone, earbuds, and watch simultaneously on weighted CNC aluminum with integrated thermal cooling pads.',
    price: 119,
    category: 'Accessories',
    brand: 'AURA Studio',
    images: [
      'https://images.unsplash.com/photo-1622445268465-843d0b2849e7?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 60,
    rating: 4.9,
    reviewCount: 95,
    isFeatured: false,
    isNew: false,
    tags: ['Fast Charge', 'MagSafe', 'CNC Aluminum'],
    variants: [
      { id: 'v5-1', name: 'Space Grey', colorHex: '#4b5563', inStock: true },
      { id: 'v5-2', name: 'Silver Aluminum', colorHex: '#e5e7eb', inStock: true }
    ],
    specs: {
      'Total Output': '25W Fast Wireless',
      'Materials': 'Machined Aluminum + Matte Silicone Pads',
      'Cable Included': '2m Braided USB-C Cable'
    },
    reviews: []
  },
  {
    id: 'prod-6',
    title: 'Aura Pulse Mechanical Earbuds',
    subtitle: 'True Wireless with Hybrid Active Noise Cancellation',
    description: 'Custom ceramic drivers housed in a water-resistant IPX7 casing with tactile touch control and low-latency gaming mode.',
    price: 199,
    originalPrice: 229,
    category: 'Audio',
    brand: 'AURA Studio',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 19,
    rating: 4.8,
    reviewCount: 118,
    isFeatured: true,
    isNew: true,
    tags: ['Waterproof IPX7', 'Low Latency', 'Ceramic Drivers'],
    variants: [
      { id: 'v6-1', name: 'Onyx Black', colorHex: '#000000', inStock: true },
      { id: 'v6-2', name: 'Pearl White', colorHex: '#ffffff', inStock: true }
    ],
    specs: {
      'Driver Size': '11mm Custom Ceramic',
      'Playtime': '8 hours (32 hours with case)',
      'Noise Control': 'Hybrid ANC (-42dB)'
    },
    reviews: []
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9842',
    customerName: 'Sophia Montgomery',
    customerEmail: 'sophia.m@example.com',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        selectedVariant: INITIAL_PRODUCTS[0].variants[0],
        quantity: 1
      }
    ],
    subtotal: 349,
    discount: 34.9,
    tax: 25.13,
    shipping: 0,
    total: 339.23,
    status: 'Delivered',
    date: '2025-02-22T14:32:00Z',
    shippingAddress: {
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      zip: '97477',
      country: 'United States'
    },
    paymentMethod: 'Credit Card (**** 4242)'
  },
  {
    id: 'ORD-9843',
    customerName: 'David Chen',
    customerEmail: 'david.c@example.com',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        selectedVariant: INITIAL_PRODUCTS[1].variants[0],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[4],
        selectedVariant: INITIAL_PRODUCTS[4].variants[0],
        quantity: 2
      }
    ],
    subtotal: 837,
    discount: 0,
    tax: 66.96,
    shipping: 0,
    total: 903.96,
    status: 'Processing',
    date: '2025-02-23T09:15:00Z',
    shippingAddress: {
      address: '100 University Ave',
      city: 'Palo Alto',
      state: 'CA',
      zip: '94301',
      country: 'United States'
    },
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'ORD-9844',
    customerName: 'Emma Watson',
    customerEmail: 'e.watson@example.com',
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        selectedVariant: INITIAL_PRODUCTS[2].variants[0],
        quantity: 1
      }
    ],
    subtotal: 289,
    discount: 0,
    tax: 23.12,
    shipping: 15,
    total: 327.12,
    status: 'Pending',
    date: '2025-02-24T18:45:00Z',
    shippingAddress: {
      address: '42 Baker Street',
      city: 'London',
      state: 'UK',
      zip: 'NW1 6XE',
      country: 'United Kingdom'
    },
    paymentMethod: 'Credit Card (**** 8812)'
  }
];

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  brandName: 'AURA',
  accentColor: 'amber',
  fontStyle: 'sans',
  announcementBarText: '✨ Spring Collection Unveiled • Free Worldwide Express Shipping on Orders over $150',
  showAnnouncementBar: true,
  showHeroVideo: true,
  heroHeadline: 'Pure Acoustic & Visual Harmony',
  heroSubheadline: 'Engineered without compromise. Experience spatial audio dynamics and precision telemetry.',
  heroCtaText: 'Explore Collection',
  productsPerPage: 6,
  enableFreeShippingBar: true,
  freeShippingThreshold: 150,
  darkMode: false
};