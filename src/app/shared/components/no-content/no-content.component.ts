import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <ion-row>
      <ion-col>
        <p>
          {{text}}
        </p>
      </ion-col>
    </ion-row>
    `,
  styles: [
    `p{
        text-align: center;
        font-style: italic;
        color: orange;
      }`
  ],
})
export class NoContentComponent implements OnInit {

  @Input() text = 'No data available!';

  constructor() { }

  ngOnInit() { }

}
