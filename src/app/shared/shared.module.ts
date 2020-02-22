import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { NoContentComponent } from './components/no-content/no-content.component';
import { ReversePipe } from './pipes/reverse.pipe';
@NgModule({
  declarations: [
    NoContentComponent,
    ReversePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  exports: [
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NoContentComponent,
    ReversePipe
  ]
})
export class SharedModule { }
