export interface Product {
  image: any;
  _id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export interface MarketingItem {
  _id?: string;
  type: 'discount' | 'banner';
  code?: string;
  discountPercent?: number;
  title?: string;
   image?: string;
  // imageUrl: string;
  isActive: boolean;
}
