import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { AngularHelperService } from './../core/services/angular-helper.service';
import { AlertService } from './../core/services/alert.service';
import { Product, SubCategory } from './../model/store.model';
import { AppService } from './../core/services/app.service';
import { DataStoreService } from './../core/services/data-store.service';
import { from } from 'rxjs';

const pageSize = 10;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})

export class AdminPage implements OnInit, OnDestroy {
  public products: Product[] = [];
  public searchString: string;
  public currentPage = 1;
  public itemsPerPage = pageSize;
  public maxPageSize: number;
  private alertType = 'DEFAULT';
  public inProgressCount = 0;
  private pollingData: any;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private appService: AppService,
    private store: DataStoreService
  ) { }

  ngOnInit() {
    this.fetchAdminDashboard();
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.appService.fetchPendingCount())
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => this.inProgressCount = res);
  }


  ionViewWillEnter() { }

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
    this.alertType = 'LOGOUT';
    this.alertService.presentAlertConfirm('Confirm', 'You want to logout?', this.onConfirm.bind(this), this.onCancel.bind(this));
  }

  private onSuccess(products: Product[]) {
    this.products = products;
    this.currentPage = 1;
    this.maxPageSize = products.length / this.itemsPerPage;
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
    this.alertService.presentAlertConfirm('Alert', 'Something went wrong!', this.onConfirm.bind(this), this.onCancel.bind(this));
  }

  public onNavigate(path) {
    this.angularHelperService.doNavigate(path);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public toOrder() {
    this.angularHelperService.doNavigate(`home/${this.store.UserRole}`);
  }

}

