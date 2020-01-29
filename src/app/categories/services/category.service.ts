import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../../model/store.model';
import * as HttpConstants from './../../core/constants/http.constants';
import { DataService } from './../../core/services/data.service';


@Injectable()
export class CategoryService {

  constructor(
    private dataService: DataService
  ) { }

  public fetchCategories(): Observable<Category[]> {
    const url = `/${HttpConstants.API_CATEGORIES}`;
    return this.dataService.get(url);
  }

}
