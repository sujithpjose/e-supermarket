import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private isLoading;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  async showLoading() {
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return loading.present();
  }

  hideLoading() {
    /*  if (this.isLoading) {
       this.isLoading = false;
       return await this.loadingController.dismiss().then(() => console.log('dismissed'));
     } */
    this.loadingController.dismiss();
  }

  public async presentAlertConfirm(title, msg, onConfirm, onCancel) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            onCancel('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            onConfirm('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
