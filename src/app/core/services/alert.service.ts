import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private isLoading;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
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

  public async presentAlert(title, msg, onConfirm) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            onConfirm('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  public async presentToast(msg, color = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color
    });

    toast.present();
  }

}
