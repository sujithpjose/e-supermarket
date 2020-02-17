import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularHelperService } from '../../core/services/angular-helper.service';
import { AlertService } from '../../core/services/alert.service';

import { Login } from '../../model/store.model';
import { LoginService } from '../service/login.service';
import { DataStoreService } from './../../core/services/data-store.service';
import { User } from '../../model/store.model';

const branch = {
  id: 13,
  name: '1234567',
  location: '123456',
  contact: 123456,
  password: '1223',
  startDate: '28/02/1990',
  isAdmin: false
};

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public login: Login;
  public loginForm: FormGroup;

  constructor(
    private angularHelperService: AngularHelperService,
    private alertService: AlertService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private dataStore: DataStoreService
  ) { }

  ngOnInit() {
    const login = new Login('Syam', 'syam');
    this.initForm(login);
  }

  private initForm(login: Login) {
    this.loginForm = this.formBuilder.group({
      name: new FormControl(login.name, Validators.required),
      password: new FormControl(login.password, Validators.required)
    });
  }

  public async doLogin() {
    await this.alertService.showLoading();
    const login: Login = this.loginForm.value;

    this.loginService.getUser(login.name)
      .subscribe((res: User) => {
        this.processUser(res);
      }, err => {
        this.handleError(err);
      });
  }

  private processUser(user: User) {
    if (user.password !== this.loginForm.value.password) {
      this.handleError(null);
      return;
    }
    this.dataStore.UserId = user.id;
    const path = this.loginService.handleNavigation(user);
    this.alertService.hideLoading();

    this.angularHelperService.doNavigate(path);
  }

  private onConfirm(msg) {
    console.log(msg);
  }

  private onCancel(msg) {
    console.log(msg);
  }

  private handleError(err) {
    console.log(err);
    this.alertService.hideLoading();
    this.alertService.presentAlert('Alert', 'Wrong credentials!', this.onConfirm);
  }

}
