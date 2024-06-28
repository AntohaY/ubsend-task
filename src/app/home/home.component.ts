import { Component, inject } from "@angular/core";
import { ProductCatalogComponent } from "../product-catalog/product-catalog.component";
import { ProductService } from "../shared/data-access/products.service";
import { AuthService } from "../shared/data-access/auth.service";

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [ProductCatalogComponent],
    styles: [`
        h1 {
            margin: unset;
        }
    `],
})
export default class HomeComponent {
    productsService = inject(ProductService);
    authService = inject(AuthService);
}