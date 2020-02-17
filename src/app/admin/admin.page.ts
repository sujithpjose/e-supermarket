import { Component, OnInit, ViewChild } from '@angular/core';

import { AngularHelperService } from './../core/services/angular-helper.service';
import { AlertService } from './../core/services/alert.service';
import { Product, SubCategory } from './../model/store.model';
import { AppService } from './../core/services/app.service';
import { DataStoreService } from './../core/services/data-store.service';

const pageSize = 9;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})

export class AdminPage implements OnInit {
  public products: Product[] = [];
  public searchString: string;
  public currentPage = 1;
  public itemsPerPage = pageSize;
  public maxPageSize: number;

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private appService: AppService,
    private dataStore: DataStoreService
  ) { }

  ngOnInit() {
    this.fetchAdminDashboard();
  }

  ionViewWillEnter() {
    console.log('in View Enter');
  }

  public async fetchAdminDashboard() {
    await this.alertService.showLoading();

    this.appService.fetchAdminDashboard()
      .subscribe((res: Product[]) => {
        this.onSuccess(res);
      }, err => {
        this.handleError(err);
      });
  }

  public doLogout() {
    this.appService.doLogout();
  }

  private onSuccess(products: Product[]) {
    this.products = products;
    this.currentPage = 1;
    this.maxPageSize = products.length / this.itemsPerPage;
    this.alertService.hideLoading();
  }

  private onConfirm(msg) {
    console.log(msg);
  }

  private onCancel(msg) {
    console.log(msg);
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

