import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Product, Branch } from './../../model/store.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private userRole;
  private selectedCategory;
  private cart: Product[] = [];
  private branch: Branch;
  private adminID: number;

  constructor(
    private storage: Storage
  ) { }

  public set UserRole(id) {
    this.userRole = id;
  }

  public get UserRole() {
    return this.userRole;
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

  public set Branch(branch) {
    this.branch = branch;
  }

  public get Branch() {
    return this.branch;
  }

  public set AdminID(id) {
    this.adminID = id;
  }

  public get AdminID() {
    return this.adminID;
  }

  public empty() {
    this.userRole = null;
    this.selectedCategory = null;
    this.branch = null;
    this.adminID = null;
    this.emptyCart();
  }

  public emptyCart() {
    this.cart = [];
    this.storage.set('cart', this.cart);
  }

}
