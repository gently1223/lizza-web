export interface ShoppingData {
  name: string,
  phone: number,
  email: string,
  street: string,
  numberInt: string,
  zipCode: number,
  colony: string,
  city: string,
  state: string,
  packService: string
}

export interface Product {
  link_id?: string;
  payment_id?: string;
  url: string;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  date?: firebase.default.firestore.Timestamp;
  uid?: string;
  image?: string;
  payments?: number;
  sell_price?: number;
  username?: string;
  price_id?: string;
  isActive: boolean;
  dimensions: {
    height: number;
    width: number;
    length: number;
    weight: number;
  },
  aditional_data?: string;
}

export interface ProductInCart extends Omit<Product, 'aditional_data' | 'isActive'>  {
  amount: number;
}

export interface Payment {
  link_id?: string;
  name: string;
  email: string;
  phone: string;
  product_name: string;
  user_id: string;
  payment_id: string;
  status: string;
  date?: firebase.default.firestore.Timestamp;
  uid?: string;
  image?: string;
  price: number;
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
}

export interface User {
  uid?: string;
  token?: string;
  username?: string;
  phone?: string;
  email?: string;
  type?: 'wholesale' | 'seller';
  address: {
    city?: string;
    street?: string;
    number_in?: string;
    number_out?: string;
    postal_code: string;
    state?: string;
    add_ref?: string;
  };
  bank_details: {
    name: string;
    clabe: string;
  };
  socials: {
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  store_name?: string;
  igtoken?: string;
}
