import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../model/store.model';
import * as HttpConstants from './../../core/constants/http.constants';
import { DataService } from './../../core/services/data.service';

@Injectable()
export class ProductsService {

  constructor(
    private dataService: DataService
  ) { }

  public fetchProducts(id): Observable<Product[]> {
    const url = `/${HttpConstants.API_PRODUCTS}`;
    return this.dataService.get(url);
  }
}
