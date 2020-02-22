import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularHelperService } from '../core/services/angular-helper.service';
import { AlertService } from './../core/services/alert.service';
import { AppService } from './../core/services/app.service';
import { DataStoreService } from './../core/services/data-store.service';

import { Order } from './../model/store.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public orders: Order[] = [];
  private alertType = 'DEFAULT';
  public name: string;
  public role: 'ADMIN' | 'BRANCH';

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private appService: AppService,
    private store: DataStoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.role = this.store.UserRole;
  }

  ionViewWillEnter() {
    this.fetchOrders();
  }

  public async fetchOrders() {
    await this.alertService.showLoading();

    this.appService.fetchOrders()
      .subscribe((res: Order[]) => {
        this.onSuccess(res);
      }, err => {
        this.handleError(err);
      });
  }

  private onSuccess(orders: Order[]) {
    this.orders = orders;
    this.alertService.hideLoading();
  }

  private onConfirm(msg) {
    switch (this.alertType) {
      case 'LOGOUT':
        this.store.empty();
        this.onNavigate('/login');
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

  public toDetails(id) {
    this.angularHelperService.doNavigate(`purchase-details/${id}`);
  }

  public onNavigate(path) {
    this.angularHelperService.doNavigate(path);
  }

  public doLogout() {
    this.alertType = 'LOGOUT';
    this.alertService.presentAlertConfirm('Confirm', 'You want to logout?', this.onConfirm.bind(this), this.onCancel.bind(this));
  }

  public toCart() {
    this.angularHelperService.doNavigate('cart');
  }

}
