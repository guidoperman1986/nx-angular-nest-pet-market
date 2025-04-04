import { Component, input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    console.log(this.product());
  }

  onAddToCart(arg0: unknown) {
  }
}
