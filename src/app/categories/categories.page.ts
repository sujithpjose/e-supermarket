import { Component, OnInit } from '@angular/core';

import { AngularHelperService } from './../core/services/angular-helper.service';
import { AlertService } from './../core/services/alert.service';
import { Category } from './../model/store.model';
import { AppService } from './../core/services/app.service';
import { DataStoreService } from './../core/services/data-store.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  public categories: Category[] = [];
  public searchString = '';
  private alertType = 'DEFAULT';

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private appService: AppService,
    private dataStore: DataStoreService
  ) { }

  ngOnInit() {
    this.fetchCategories();
  }

  public toProducts(category) {
    this.dataStore.SelectedCategory = category;
    this.angularHelperService.doNavigate('products', { data: 'NEW' });
  }

  public toCart() {
    this.angularHelperService.doNavigate('cart');
  }

  public onExpand(category: Category) {
    if (category.expanded) {
      category.expanded = false;
    } else {
      category.expanded = true;
    }
  }

  public async fetchCategories() {
    await this.alertService.showLoading();

    this.appService.fetchCategories()
      .subscribe((res: Category[]) => {
        this.onSuccess(res);
      }, err => {
        this.handleError(err);
      });
  }

  public doLogout() {
    this.alertType = 'LOGOUT';
    this.alertService.presentAlertConfirm('Confirm', 'You want to logout?', this.onConfirm.bind(this), this.onCancel.bind(this));
  }

  public doSearch() {
    this.angularHelperService.doNavigate(`product-search/${this.searchString}`);
  }

  private onSuccess(categories: Category[]) {
    this.categories = categories.filter(item => !item.parent);
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
    this.alertService.presentAlert('Alert', 'Something went wrong!', this.onConfirm.bind(this));
  }

}
