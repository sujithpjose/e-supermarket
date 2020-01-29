import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AngularHelperService {

  constructor(
    private router: Router
  ) { }

  public doNavigate(url: string, options?) {
    this.router.navigate([url], options);
  }
}
