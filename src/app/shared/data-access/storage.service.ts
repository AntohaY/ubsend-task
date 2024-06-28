import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../interfaces/product';
import { Order } from '../interfaces/order';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'window local storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.localStorage
        : ({} as Storage);
    },
  }
);

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(LOCAL_STORAGE);

  loadProducts() {
    this.uploadProductsToStorage();
    const products = this.storage.getItem('products');
    return of(products ? (JSON.parse(products) as Product[]) : []);
  }

  loadOrders() {
    const orders = this.storage.getItem('orders');
    return of(orders ? (JSON.parse(orders) as Order[]) : []);
  }

  uploadProductsToStorage() {
    this.storage.setItem('products', JSON.stringify([
      {
        "id":"1",
        "name":"Smartphone X",
        "price":"799.99",
        "description":"A high-end smartphone with a sleek design and powerful features.",
      },
      {
        "id":"2",
        "name":"Running Shoes",
        "price":"120.00",
        "description":"Comfortable and durable running shoes for all terrains.",
      },
      {
        "id":"3",
        "name":"Wireless Headphones",
        "price":"199.99",
        "description":"Noise-cancelling wireless headphones with superior sound quality.",
      },
      {
        "id":"4",
        "name":"Coffee Maker",
        "price":"89.99",
        "description":"Brews delicious coffee quickly and efficiently.",
      },
      {
        "id":"5",
        "name":"Backpack",
        "price":"59.99",
        "description":"A spacious and stylish backpack for everyday use.",
      },
      {
        "id":"6",
        "name":"Gaming Console",
        "price":"499.99",
        "description":"The latest gaming console with incredible graphics and performance.",
      },
      {
        "id":"7",
        "name":"Digital Camera",
        "price":"649.99",
        "description":"Capture stunning photos and videos with this high-quality digital camera.",
      },
      {
        "id":"8",
        "name":"Electric Toothbrush",
        "price":"39.99",
        "description":"Keep your teeth clean and healthy with this electric toothbrush.",
      },
      {
        "id":"9",
        "name":"Office Chair",
        "price":"149.99",
        "description":"Ergonomic office chair with adjustable settings for maximum comfort.",
      },
      {
        "id":"10",
        "name":"Fitness Tracker",
        "price":"99.99",
        "description":"Track your fitness goals and monitor your health with this wearable device.",
      }
   ]))
  }
}