import { Address } from "./userTypes";

export type Orders = {
  orderNumber: string;
  orderDate: string;
  totalPrice: number;
  paymentStatus: string;
  deliveryAddress: Address;
  deliveryDate: string;
  status: string;
  products: Product[];
  createdAt: string;
  userId: UserId;
};
export type ProductId = {
    quantity: number;
    productId: string;
    image: string;
    productName: string;
    description: string;
    price: number;
    category: {
      categoryName: string;
    };
  };

export type Product = {
    quantity: number;
    productId: ProductId;
  };

export type Category = {
    _id: string;
    categoryName: string;
  };

export type UserId={
    firstName: string;
    lastName: string;
    _id: string;
  }
  
  