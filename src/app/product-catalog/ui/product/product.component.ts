import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../../shared/interfaces/product';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    standalone: true,
    selector: 'app-product',
    templateUrl: 'product.component.html',
    styles: [`
        .product-card {
            max-width: 400px;
        }

        .product-card-footer {
            padding: 16px;
        }

        .product-card__content--description {
            max-height: 12rem;
            overflow-y: auto;
        }
    `],
    imports: [MatCardModule, MatButtonModule, MatChipsModule]
})

export class ProductComponent {
    @Input({required: true}) product!: Product;
    @Input({required: true}) userLoggedIn: boolean = false;
    @Output() addProductToCart = new EventEmitter();
}