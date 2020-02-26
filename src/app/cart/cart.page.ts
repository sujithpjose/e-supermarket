import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { DataStoreService } from './../core/services/data-store.service';
import { AppService } from './../core/services/app.service';
import { AlertService } from './../core/services/alert.service';
import { AngularHelperService } from './../core/services/angular-helper.service';
import { Product, PurchaseRequest, PurchaseItems, ProductRequest } from './../model/store.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  // public cart = [];
  public orderForm: FormGroup;
  public items: FormArray;
  private alertType = 'DEFAULT';

  constructor(
    private dataStoreService: DataStoreService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private angularHelperService: AngularHelperService
  ) {
    this.initForm();
  }

  ionViewWillEnter() {
    this.dataStoreService.getFromCart().then(value => {
      const cart = JSON.parse(JSON.stringify(value));
      const formArray = this.orderForm.get('items') as FormArray;

      this.clearFormArray(formArray);
      cart.forEach(element => {
        this.addItem(element);
      });
    });
  }

  ngOnInit() { }

  private initForm() {
    const product = new Product(null, null, null, null, null, null, null, null, null, null, null, null, null , null);

    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem(product)])
    });
  }

  private clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  private createItem(item: Product): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      description: [item.description],
      availableQuantity: [item.quantity],
      barcode: [item.barcode],
      categoryId: [item.categoryId],
      categoryName: [item.category ? item.category.name : ''],
      imgUrl: [item.image],
      inCart: [item.inCart],
      isNew: [item.newArrival],
      orderedQuantity: [item.orderedQuantity, [Validators.required, Validators.min(1)]],
      uom: [item.uom]
    });
  }

  private addItem(item: Product): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem(item));
  }

  public deleteFromCart(product) {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.removeAt(this.items.value.findIndex(item => item.id === product.value.id));

    this.dataStoreService.deleteFromCart(product.value);
    this.alertService.presentToast('Product removed!');
  }

  public addToCart(product) {
    this.dataStoreService.Cart = product.value;
    this.alertService.presentToast('Quantity updated!');
  }

  public doLogout() {
    this.alertType = 'LOGOUT';
    this.alertService.presentAlertConfirm('Confirm', 'You want to logout?', this.onConfirm.bind(this), this.onCancel.bind(this));
  }

  public async onSubmit() {
    if (this.orderForm.invalid || this.orderForm.get('items').value.length === 0) return;

    await this.alertService.showLoading();
    const request = this.createPurchaseRequest();

    this.appService.createPurchaseOrder(request).subscribe(data => {
      console.log(data, 'order created');
      this.dataStoreService.emptyCart();
      this.alertType = 'CREATE';
      this.alertService.hideLoading();
      this.alertService.presentAlert('Success', 'Order created successfully', this.onConfirm.bind(this));
    }, err => {
      this.handleError(err);
    });

  }

  private createPurchaseRequest() {
    console.log(this.items.value);
    const items = this.items.value.map(product => {
      const aProduct = new ProductRequest(null, null, product.id);
      return new PurchaseItems(aProduct, product.orderedQuantity);
    });

    const itemArray = new PurchaseRequest(this.dataStoreService.Branch, 'NEW', items);
    console.log(itemArray);

    return itemArray;
  }

  private onConfirm(type) {
    switch (this.alertType) {
      case 'LOGOUT':
        this.dataStoreService.empty();
        this.angularHelperService.doNavigate('/login');
        break;
      case 'CREATE':
        this.angularHelperService.doNavigate(`/home/${this.dataStoreService.Branch.name}`);
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
