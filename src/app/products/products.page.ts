import { Component, OnInit } from '@angular/core';

import { AngularHelperService } from './../core/services/angular-helper.service';
import { AlertService } from './../core/services/alert.service';
import { Product } from './../model/store.model';
import { ProductsService } from './services/products.service';
import { DataStoreService } from './../core/services/data-store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  public products: Product[] = [];
  public searchString: string;
  public selectedCategory = {
    "id": 1,
    "name": "Paper Goods1",
    "noOfProducts": 12
  };

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private ProductsService: ProductsService,
    private dataStore: DataStoreService
  ) { }

  ngOnInit() {
    // this.selectedCategory = this.dataStore.SelectedCategory;
    this.fetchProducts(this.selectedCategory.id);
  }

  ionViewWillEnter(){
    console.log('in View Enter');
  }

  public addToCart(product) {
    this.dataStore.Cart = product;
    product.inCart = true;
  }

  public async fetchProducts(id) {
    await this.alertService.showLoading();

    this.ProductsService.fetchProducts(id)
      .subscribe((res: Product[]) => {
        this.onSuccess(res);
      }, err => {
        this.handleError(err);
      });
  }

  private onSuccess(products: Product[]) {
    this.products = products;
    this.alertService.hideLoading();
  }

  private onConfirm(msg) {
    console.log(msg)
  }

  private onCancel(msg) {
    console.log(msg)
  }

  private handleError(err) {
    console.log(err);
    this.alertService.hideLoading();
    this.alertService.presentAlertConfirm('Alert', 'Something went wrong!', this.onConfirm, this.onCancel);
  }

  public onNavigate(path) {
    this.angularHelperService.doNavigate(path);
  }

}
