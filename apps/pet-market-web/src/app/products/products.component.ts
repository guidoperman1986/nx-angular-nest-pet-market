import { CommonModule, JsonPipe } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { ProductCardComponent } from "../components/product-card/product-card.component";
import { ProductStore } from '../stores/products.store';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import untilDestroyed from '../utils/untilDestroyed';
import { CartStore } from '../stores/cart.store';

@Component({
  selector: 'app-products',
  imports: [CommonModule, JsonPipe, ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productStore = inject(ProductStore);
  searchTerm = '';
  searchSubject = new Subject<string>();
  untilDestoyed = untilDestroyed();
  cartStore = inject(CartStore);

  constructor() {
    this.productStore.loadProducts();

    afterNextRender(() => {
      this.searchSubject
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          this.untilDestoyed()
        ).subscribe((searchTerm) => {

          this.productStore.searchProducts(searchTerm);
        });
    });
  }

  onSearch(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

}
