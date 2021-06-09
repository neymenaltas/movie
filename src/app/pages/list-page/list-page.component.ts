import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ListPageHandler} from "./list-page.handler";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  providers: [ListPageHandler],
  encapsulation : ViewEncapsulation.None,
})
export class ListPageComponent implements OnInit {

  constructor(public handler: ListPageHandler) { }

  ngOnInit(): void {
    this.handler.init();
  }

}
