import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularHelperService } from './../core/services/angular-helper.service';
import { AlertService } from './../core/services/alert.service';
import { Product, SubCategory } from './../model/store.model';
import { AppService } from './../core/services/app.service';
import { DataStoreService } from './../core/services/data-store.service';

const placeholderImg = 'assets/img-placeholder.jpg';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.page.html',
  styleUrls: ['./purchase-details.page.scss'],
})
export class PurchaseDetailsPage implements OnInit {
  public order = null;
  private alertType = 'DEFAULT';

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private appService: AppService,
    private dataStore: DataStoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const orderID = this.route.snapshot.paramMap.get('id');
    this.fetchPurchaseDetails(orderID);
  }

  public async fetchPurchaseDetails(id) {
    await this.alertService.showLoading();

    this.appService.fetchPurchaseOrder(id)
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

  private onSuccess(data) {
    this.order = data;
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
