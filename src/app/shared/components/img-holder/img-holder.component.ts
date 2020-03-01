import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const placeholderImg = 'assets/img-placeholder.jpg';
@Component({
  selector: 'img-holder',
  templateUrl: './img-holder.component.html',
  styleUrls: ['./img-holder.component.scss'],
})
export class ImgHolderComponent implements OnInit {
  @Input() image;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if (this.image === '') {
      this.image = placeholderImg;
    } else {
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
        + this.image);
    }
  }

}
