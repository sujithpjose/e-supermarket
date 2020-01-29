import { Component, OnInit } from '@angular/core';

import { DataStoreService } from './../core/services/data-store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public cart = [];

  constructor(
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.dataStoreService.getFromCart().then(value => {
      this.cart = JSON.parse(JSON.stringify(value));
    })

  }

  public deleteFromCart(product) {
    this.dataStoreService.deleteFromCart(product);
  }

  public addToCart(product) {
    this.dataStoreService.Cart = product;
  }

}
