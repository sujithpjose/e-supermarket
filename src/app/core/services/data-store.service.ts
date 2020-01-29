import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Product } from './../../model/store.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private userId;
  private selectedCategory;
  private cart: Product[] = [];

  constructor(
    private storage: Storage
  ) { }

  public set UserId(id) {
    this.userId = id;
  }

  public get UserId() {
    return this.userId;
  }

  public set SelectedCategory(category) {
    this.selectedCategory = category;
  }

  public get SelectedCategory() {
    return this.selectedCategory;
  }

  public set Cart(product) {
    this.addToCart(product);
  }

  public get Cart() {
    return this.getFromCart();
  }

  private addToCart(product) {
    let index = this.cart.findIndex(item => item.id === product.id);

    if (index > -1) {
      this.cart[index] = product;
    } else {
      this.cart.push(product);
    }

    this.storage.set('cart', this.cart);

  }

  public deleteFromCart(product) {
    let index = this.cart.findIndex(item => item.id === product.id);
    this.cart.splice(index, 1);
  }

  public async getFromCart() {
    debugger
    const cart = await this.storage.get('cart');

    return cart;
  }

}
