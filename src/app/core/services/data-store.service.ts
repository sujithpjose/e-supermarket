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
  private branchID: number;
  private adminID: number;

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
    const index = this.cart.findIndex(item => item.id === product.id);

    if (index > -1) {
      this.cart[index] = product;
    } else {
      this.cart.push(product);
    }

    this.storage.set('cart', this.cart);

  }

  public deleteFromCart(product) {
    const index = this.cart.findIndex(item => item.id === product.id);
    this.cart.splice(index, 1);

    this.storage.set('cart', this.cart);
  }

  public async getFromCart() {
    const cart = await this.storage.get('cart');
    this.cart = cart;

    return cart;
  }

  public set BranchID(id) {
    this.branchID = id;
  }

  public get BranchID() {
    return this.branchID;
  }

  public set AdminID(id) {
    this.adminID = id;
  }

  public get AdminID() {
    return this.adminID;
  }

  public empty() {
    this.userId = null;
    this.selectedCategory = null;
    this.cart = [];
    this.branchID = null;
    this.adminID = null;
    this.storage.set('cart', this.cart);
  }

}
