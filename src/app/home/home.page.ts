import { Component } from '@angular/core';

import { AngularHelperService } from '../core/services/angular-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private angularHelperService: AngularHelperService
  ) { }

  public onNavigate(path) {
    this.angularHelperService.doNavigate(path);
  }

}
