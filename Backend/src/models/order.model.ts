import { Schema, model, Document, ObjectId } from "mongoose";


export enum OrderStatus {
    Pending = 'Pending',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
    }

export enum PaymentStatus {
    Unpaid = 'Unpaid',
    Paid = 'Paid',
    Refunded = 'Refunded',
    }
    
// Interface for products within the order
interface OrderedProduct {
  productId: ObjectId; 
  quantity: number;
}

export interface DeliveryAddress {
        streetNumber: number;
        streetName: string;
        city: string;
        country: string;
        postCode: string;
      }

const addressSchema = new Schema<DeliveryAddress>({
        streetNumber: { type: Number, required: true },
        streetName: { type: String, required: true },
        city: { type: String, required: true },
        postCode: { type: String, required: true },
        country: { type: String, required: true }
      }, { _id: false });


export interface OrderDocument extends Document {
  userId: ObjectId;  
  orderNumber: string;
  products: OrderedProduct[];  
  totalPrice: number;  
  deliveryDate: Date;
  deliveryAddress: DeliveryAddress;
  status: OrderStatus;  
  paymentStatus: PaymentStatus;  
}


const orderSchema = new Schema<OrderDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
  orderNumber: { type: String, required: true, unique: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },  
      quantity: { type: Number, required: true }, 
    }
  ],
  totalPrice: { type: Number, required: true, min: 0 },
  deliveryDate: { type: Date, required: true, min: new Date(),
    default: () => {
    // Set the delivery date to 4 days from now
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    return deliveryDate;
} },  

  deliveryAddress: { type: addressSchema, required: true },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Pending
}, 
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.Unpaid
},
}, { timestamps: true });


const Order = model<OrderDocument>('Order', orderSchema);
export default Order;