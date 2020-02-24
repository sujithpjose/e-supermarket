import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order, Category, Product, PurchaseRequest } from '../../model/store.model';
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

    public fetchOrders(): Observable<Order[]> {
        let url;
        if (this.store.UserRole === 'ADMIN') {
            url = `/${HttpConstants.API_PENDING_ORDER}`;
        } else {
            const storeId = this.store.Branch.id;
            url = `/${HttpConstants.API_ORDER_FOR_BRANCH}`;
            url = this.helper.beautifyUrl(url, [storeId]);
        }

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
        const url = `/${HttpConstants.API_FAVORITES}`;
        return this.dataService.get(url);
    }

    public createPurchaseOrder(data: PurchaseRequest): Observable<any> {
        const url = `/${HttpConstants.API_PURCHASE}`;
        return this.dataService.put(url, data);
    }

    public fetchPendingCount(): Observable<any> {
        const url = `/${HttpConstants.API_PENDING}`;
        return this.dataService.get(url);
    }

    public fetchPurchaseOrder(id) {
        let url = `/${HttpConstants.API_PURCHASE_ORDER}`;
        url = this.helper.beautifyUrl(url, [id]);

        return this.dataService.get(url);
    }

    public searchProducts(text): Observable<Product[]> {
        let url = `/${HttpConstants.API_PRODUCT_SEARCH}`;
        url = this.helper.beautifyUrl(url, [text]);

        return this.dataService.get(url);
    }

}
