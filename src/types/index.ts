export type ProductCategory = 'Audio' | 'Wearables' | 'Smart Home' | 'Accessories';

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  inStock: boolean;
  priceModifier?: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  brand: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  tags: string[];
  variants: ProductVariant[];
  specs: Record<string, string>;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
}

export interface ThemeSettings {
  brandName: string;
  accentColor: string; // 'amber' | 'emerald' | 'indigo' | 'rose' | 'cyan'
  fontStyle: 'sans' | 'serif' | 'mono';
  announcementBarText: string;
  showAnnouncementBar: boolean;
  showHeroVideo: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  productsPerPage: number;
  enableFreeShippingBar: boolean;
  freeShippingThreshold: number;
  darkMode: boolean;
}

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

export type ActiveTab = 'storefront' | 'admin-dashboard' | 'admin-products' | 'admin-orders' | 'admin-theme';