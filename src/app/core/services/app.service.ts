import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order, Category, Product } from '../../model/store.model';
import * as HttpConstants from './../constants/http.constants';
import { DataService } from './../services/data.service';
import { DataStoreService } from './../services/data-store.service';
import { AngularHelperService } from './../services/angular-helper.service';
import { HelperService } from './../services/helper.service';
import { AlertService } from './../services/alert.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AppService {

    constructor(
        private dataService: DataService,
        private store: DataStoreService,
        private angularHelperService: AngularHelperService,
        private helper: HelperService,
        private alertService: AlertService
    ) { }

    public doLogout() {
        // TODO : refractor
        this.alertService.presentAlertConfirm('Confirm', 'You want to logout?', this.onConfirm, this.onCancel);
    }

    public fetchOrders(id): Observable<Order[]> {
        let url = `/${HttpConstants.API_ORDER}`;
        url = this.helper.beautifyUrl(url, [id]);

        return this.dataService.get(url);
    }

    public fetchCategories(): Observable<Category[]> {
        const url = `${HttpConstants.API_CATEGORY}`;
        return this.dataService.get(url);
    }

    public fetchProducts(id): Observable<Product[]> {
        let url = `/${HttpConstants.API_PRODUCT}`;
        url = this.helper.beautifyUrl(url, [id]);

        return this.dataService.get(url);
    }

    public fetchAdminDashboard(): Observable<Product[]> {
        const url = `/${HttpConstants.API_ADMIN}`;
        return this.dataService.get(url);
    }

    private onConfirm(msg) {
        this.store.empty();
        this.angularHelperService.doNavigate('/login');
    }

    private onCancel(msg) {
        console.log(msg);
    }
}
