import { Injectable, computed, signal } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Order, RemoveOrderItem } from '../../shared/interfaces/order';


export interface OrderState {
  orderItems: Order[];
}

@Injectable({providedIn: 'root'})
export class OrderService {
 
  // State

  private state = signal<OrderState>({
    orderItems: [],
  })

  // Selectors

  orderItems = computed(() => this.state().orderItems);

  // Sources

  add$ = new Subject<Order>();

  remove$ = new Subject<RemoveOrderItem>();

  constructor() { 
    // Reducers

    this.add$.pipe(takeUntilDestroyed()).subscribe((orderItem) =>
        this.state.update((state) => ({
          ...state,
          orderItems: [...state.orderItems, this.addIdToOrderItem(orderItem)],
        }))
      );
  }

  private addIdToOrderItem(orderItem: Order) {
    return {
      ...orderItem,
      id: Date.now().toString(),
    };
  }
}