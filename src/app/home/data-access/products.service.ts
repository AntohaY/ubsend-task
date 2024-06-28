import { Injectable, computed, inject, signal } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { catchError, EMPTY } from 'rxjs';
import { StorageService } from '../../shared/data-access/storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


export interface ProductsState {
  products: Product[];
  loaded: boolean;
}

@Injectable({providedIn: 'root'})
export class ProductService {
  storageService = inject(StorageService);

  // State

  private state = signal<ProductsState>({
    products: [],
    loaded: false,
  })

  private productsLoaded$ = this.storageService.loadProducts().pipe(
    catchError((err) => {
      return EMPTY;
    })
  );

  // Selectors

  products = computed(() => this.state().products);

  loaded = computed(() => this.state().loaded);

  constructor() { 
    this.productsLoaded$.pipe(takeUntilDestroyed()).subscribe((products) =>
      this.state.update((state) => ({
        ...state,
        products,
      }))
    );
  }
}