import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as HttpConstants from './../../core/constants/http.constants';
import { User } from '../../model/store.model';
import { DataService } from './../../core/services/data.service';


@Injectable()
export class LoginService {

  constructor(
    private dataService: DataService
  ) { }

  public doLogin(username = 'Sujith', password = '1234'): Observable<User> {
    const url = `/${username}`;
    return this.dataService.get(url);
  }

  public handleNavigation(user: User): string {
    let navigateTo: string;
    if (user.isAdmin) {
      navigateTo = 'dashboard';
    } else {
      navigateTo = 'home';
    }
    return navigateTo;
  }

}
