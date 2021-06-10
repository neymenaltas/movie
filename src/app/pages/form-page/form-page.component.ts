import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormPageHandler} from './form-page.handler';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  providers: [FormPageHandler],
})
export class FormPageComponent implements OnInit {

  constructor(public handler: FormPageHandler) { }

  ngOnInit(): void {
    this.handler.init();
  }

}
