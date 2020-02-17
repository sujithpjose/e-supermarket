import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  beautifyUrl(url: string, args: any[]): string {
    args.forEach(item => {
      url = url.replace('{?}', encodeURIComponent(item));
    });
    return url;
  }
}
