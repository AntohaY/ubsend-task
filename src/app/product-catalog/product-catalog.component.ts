import { Component, Input, OnInit, effect, inject, signal } from '@angular/core';
import { ProductComponent } from './ui/product/product.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { Product } from '../shared/interfaces/product';
import { OrderService } from '../cart/data-access/order.service';
import { FormModalComponent } from '../shared/ui/form-modal.component';
import { ModalComponent } from '../shared/ui/modal.component';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../shared/interfaces/user';
import { OrderState } from '../shared/interfaces/order';

@Component({
    standalone: true,
    imports: [ProductComponent, MatGridListModule, FormModalComponent, ModalComponent],
    styles: [``],
    selector: 'app-product-catalog',
    templateUrl: 'product-catalog.component.html'
})

export class ProductCatalogComponent {
    @Input({required: true}) products!: Product[];
    @Input({required: true}) user!: User | null;

    orderService = inject(OrderService);
    formBuilder = inject(FormBuilder);

    orderItemBeingAdded = signal<Product | null>(null);

    orderItemForm = this.formBuilder.nonNullable.group({
        amount: [0, [Validators.required, Validators.min(Number.MIN_VALUE)]],
        deliverAtDate: [null, Validators.required]
    });

    orderProduct(product: Product, amount: number, deliverAtDate: string) {
        if (this.user)
            this.orderService.add$.next({
                id: Date.now().toString(),
                amount: amount.toString(),
                product,
                createdAt: Date.now().toString(),
                deliverAtDate,
                price: product.price,
                lastModifiedAt: Date.now().toString(),
                lastModifiedBy: this.user,
                customer: this.user,
                state: OrderState.CREATED
            })
    }

    constructor() {
        effect(() => {
          const checklist = this.orderItemBeingAdded();
    
          if (!checklist) {
            this.orderItemForm.reset();
          }
        });
      }
}