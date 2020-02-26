import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularHelperService } from './../core/services/angular-helper.service';
import { AlertService } from './../core/services/alert.service';
import { Product, SubCategory } from './../model/store.model';
import { AppService } from './../core/services/app.service';
import { DataStoreService } from './../core/services/data-store.service';

// const placeholderImg = 'assets/img-placeholder.jpg';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss'],
})

export class ProductSearchPage implements OnInit {
  public products: Product[] = [];
  public searchString: string;
  public selectedCategory;
  private alertType = 'DEFAULT';

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private appService: AppService,
    private dataStore: DataStoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const searchString = this.route.snapshot.paramMap.get('searchText');
    console.log(searchString);
    this.fetchProducts(searchString);
  }

  ionViewWillEnter() {
    this.processProducts();
  }

  private processProducts() {
    this.dataStore.getFromCart().then((cart: Product[]) => {
      this.updateProductQty(cart);
    });
  }

  private updateProductQty(cart) {
    this.products.forEach(product => {
      const item = cart.find(cartItem => product.id === cartItem.id);
      if (item) {
        product.orderedQuantity = item.orderedQuantity;
        product.inCart = true;
      } else {
        product.orderedQuantity = 0;
        product.inCart = false;
      }
    });
  }

  public addToCart(product) {
    this.dataStore.Cart = product;

    const toastMsg = product.inCart ? 'Cart updated!' : 'Added to cart!';
    this.alertService.presentToast(toastMsg);
    product.inCart = true;

  }

  public async fetchProducts(searchString) {
    await this.alertService.showLoading();

    this.appService.searchProducts(searchString)
      .subscribe((res: Product[]) => {
        this.onSuccess(res);
      }, err => {
        this.handleError(err);
      });
  }

  public doLogout() {
    this.alertType = 'LOGOUT';
    this.alertService.presentAlertConfirm('Confirm', 'You want to logout?', this.onConfirm.bind(this), this.onCancel.bind(this));
  }

  public toCart() {
    this.angularHelperService.doNavigate('cart');
  }

  private onSuccess(result) {
    this.products = result.products;
    this.processProducts();
    this.alertService.hideLoading();
  }

  private onConfirm(msg) {
    switch (this.alertType) {
      case 'LOGOUT':
        this.dataStore.empty();
        this.angularHelperService.doNavigate('/login');
        break;
    }
  }

  private onCancel(msg) {
    console.log(msg);
  }

  private handleError(err) {
    console.log(err);
    this.alertService.hideLoading();
    this.alertService.presentAlertConfirm('Alert', 'Something went wrong!', this.onConfirm.bind(this), this.onCancel.bind(this));
  }

  public onNavigate(path) {
    this.angularHelperService.doNavigate(path);
  }

}
