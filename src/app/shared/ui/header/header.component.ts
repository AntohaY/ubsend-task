import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../cart/data-access/order.service';
import { AuthService } from '../../data-access/auth.service';

@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [MatButtonModule, MatToolbarModule, RouterLink],
    styles: [`
        mat-toolbar {
            background: inherit;
            color: inherit;
        }

        .example-spacer {
            flex: 1 1 auto;
        }

        a {
            margin: 15px;
            padding: 40px;
            color: inherit;
            text-decoration: none;
            background: ghostwhite;
            font-size: large;
        }

        .cart-items-button {
            color: red;
        }

        .welcome-message {
            margin-left: 15px;
        }
    `]
})

export class HeaderComponent {
    orderService = inject(OrderService);
    authService = inject(AuthService);
}