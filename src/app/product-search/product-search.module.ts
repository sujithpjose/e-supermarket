import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../shared/shared.module';

import { ProductSearchPageRoutingModule } from './product-search-routing.module';

import { ProductSearchPage } from './product-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductSearchPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductSearchPage]
})
export class ProductSearchPageModule { }
