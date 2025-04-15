import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../stores/cart.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartStore = inject(CartStore);

  updateQuantity(itemId: string, event: Event) {
    const target = event.target as HTMLInputElement
    const quantity = parseInt(target.value);

    if (quantity > 0)
      this.cartStore.updateQuantity(itemId, quantity);


  }
}
