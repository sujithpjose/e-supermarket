import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as HttpConstants from './../../core/constants/http.constants';
import { User } from '../../model/store.model';
import { DataService } from './../../core/services/data.service';
import { HelperService } from './../../core/services/helper.service';
import { DataStoreService } from './../../core/services/data-store.service';

@Injectable()
export class LoginService {

  constructor(
    private dataService: DataService,
    private helper: HelperService,
    private store: DataStoreService
  ) { }

  public getUser(username = 'Syam'): Observable<User> {
    let url = HttpConstants.API_USER;
    url = this.helper.beautifyUrl(url, [username]);

    return this.dataService.get(url);
  }

  public handleNavigation(user: User): string {
    let navigateTo: string;

    if (user.role === 'BRANCH') {
      this.store.Branch = user.branch;
      navigateTo = 'home';
    } else {
      navigateTo = 'admin';
    }
    return navigateTo;
  }

}
