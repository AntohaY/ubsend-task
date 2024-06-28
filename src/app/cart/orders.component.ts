import { Component, computed, effect, inject, signal } from '@angular/core';
import { OrderItemComponent } from './ui/order-item.component';
import { OrderService } from './data-access/order.service';
import { SearchBarComponent } from '../shared/ui/search-bar.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, map } from 'rxjs';
import { Order } from '../shared/interfaces/order';
import { SingleItemComponent } from '../shared/ui/single-item.component';

@Component({
    selector: 'app-orders',
    templateUrl: 'orders.component.html',
    standalone: true,
    imports: [OrderItemComponent, SearchBarComponent, SingleItemComponent],
    styles: [`
        ul {
            padding: 0;
            margin: 0;
        }    
    `]
})
export default class OrdersComponent {
    orderService = inject(OrderService);

    orderFormControl = new FormControl();

    orderItems: Order[] = [];

    ngOnInit(): void {
        this.orderItems = this.orderService.orderItems();
    }

    constructor() {
        this.orderFormControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            startWith(''),
            map((filterValue) => (filterValue.length ? filterValue: ''))
        )
        .subscribe((filterValue) => {
            if (filterValue) {
                this.orderItems = this.orderService.orderItems().filter(orderItem => 
                    orderItem.product.name.toLowerCase().includes(filterValue.toLowerCase()) || 
                    orderItem.product.description.toLowerCase().includes(filterValue.toLowerCase()))
            } else {
                this.orderItems = this.orderService.orderItems();
            }
        })
    }
}