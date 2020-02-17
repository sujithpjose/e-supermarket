import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { CategoriesPageRoutingModule } from './categories-routing.module';
import { SharedModule } from './../shared/shared.module';

import { CategoriesPage } from './categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    CategoriesPageRoutingModule,
    SharedModule
  ],
  declarations: [CategoriesPage],
  providers: []
})
export class CategoriesPageModule { }
