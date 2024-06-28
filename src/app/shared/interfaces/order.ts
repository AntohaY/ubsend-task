import { Product } from "./product";
import { User } from "./user";

export enum OrderState {
    CREATED = 'created',
    ASSIGNED_TO_DRIVER = 'assigned_to_driver',
    DELIVERED = 'delivered'
}

export interface Order {
    id: string;
    createdAt: string;
    deliverAtDate: string;
    amount: string;
    price: string;
    assignedToDriverAt?: string;
    deliveredAt?: string;
    lastModifiedAt: string;
    lastModifiedBy: User;
    state: OrderState;
    customer: User;
    product: Product;
    driver?: User;
}

export type RemoveOrderItem = Order['id'];