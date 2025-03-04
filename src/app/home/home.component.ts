import { Component, inject } from "@angular/core";
import { ProductCatalogComponent } from "../product-catalog/product-catalog.component";
import { ProductService } from "./data-access/products.service";
import { AuthService } from "../shared/data-access/auth.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [ProductCatalogComponent, MatProgressSpinnerModule],
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