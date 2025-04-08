import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from "@prisma/client";

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  product = input<Product>();
  addToCart = output<Product>()

  ngOnInit(): void {
    /* console.log(this.product()); */
  }

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
  }
}
