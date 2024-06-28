import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../shared/interfaces/order';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-order-item',
    template: `
        <li>
            <div class='description'>
                <ng-container *ngTemplateOutlet="contentTemplate ? contentTemplate : defaultContent; context: {$implicit: orderItem}"></ng-container>
            </div>
            <div>
                <ng-content></ng-content>
                <button mat-raised-button color="primary" (click)="edit.emit(orderItem)" [disabled]>Edit</button>
                <button mat-raised-button color="warn" (click)="delete.emit(orderItem)" [disabled]>Delete</button>
            </div>
        </li>

        <ng-template #defaultContent let-orderItem>
            <span>{{ orderItem.product.name }}</span>
            <span>{{ orderItem.product.description }}</span>
            <span>Amount: {{ orderItem.amount }}</span>
        </ng-template>
  `,
    styles: [`
        .description {
            display: flex;
            flex-direction: column;
        }

        li {
            font-size: 1.5em;
            display: flex;
            justify-content: space-between;
            background: ghostwhite;
            list-style-type: none;
            margin-bottom: 1rem;
            padding: 1rem;
            align-items: center;
            border-radius: 50px;
            box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);


            button {
                margin-left: 1rem;
            }
        }
    `],
    imports: [MatButtonModule, NgTemplateOutlet]
})

export class OrderItemComponent {
    @Input({required: true}) orderItem!: Order;
    @Input() contentTemplate!: any;
    @Output() edit = new EventEmitter<Order>();
    @Output() delete = new EventEmitter<Order>();
}