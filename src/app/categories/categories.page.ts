import { Component, OnInit } from '@angular/core';

import { AngularHelperService } from './../core/services/angular-helper.service';
import { AlertService } from './../core/services/alert.service';
import { Category } from './../model/store.model';
import { CategoryService } from './services/category.service';
import { DataStoreService } from './../core/services/data-store.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  public categories: Category[] = [];
  public searchString: string;

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private categoryService: CategoryService,
    private dataStore: DataStoreService
  ) { }

  ngOnInit() {
    this.fetchCategories();
  }

  public toProducts(category) {
    this.dataStore.SelectedCategory = category;
    this.angularHelperService.doNavigate('products');
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

    this.categoryService.fetchCategories()
      .subscribe((res: Category[]) => {
        this.onSuccess(res);
      }, err => {
        this.handleError(err);
      });
  }

  private onSuccess(categories: Category[]) {
    this.categories = categories;
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

}
