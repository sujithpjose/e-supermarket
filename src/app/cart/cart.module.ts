import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../shared/shared.module';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    CartPageRoutingModule
  ],
  declarations: [CartPage]
})
export class CartPageModule { }
