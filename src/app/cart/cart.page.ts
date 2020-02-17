import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { DataStoreService } from './../core/services/data-store.service';
import { AppService } from './../core/services/app.service';
import { AlertService } from './../core/services/alert.service';
import { Product } from './../model/store.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  // public cart = [];
  public orderForm: FormGroup;
  public items: FormArray;

  constructor(
    private dataStoreService: DataStoreService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
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
    const product = new Product(null, null, null, null, null, null, null, null, null, null, null, null);

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
      availableQuantity: [item.availableQuantity],
      barcode: [item.barcode],
      categoryId: [item.categoryId],
      categoryName: [item.categoryName],
      imgUrl: [item.imgUrl],
      inCart: [item.inCart],
      isNew: [item.isNew],
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
    this.appService.doLogout();
  }

  public onSubmit() {
    if (this.orderForm.invalid) return;

  }

}
