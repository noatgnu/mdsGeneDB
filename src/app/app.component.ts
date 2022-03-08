import { Component } from '@angular/core';
import {WebServiceService} from "../services/web-service.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public web: WebServiceService, public dataService: DataService) {
    this.web.getData()
  }

  title = 'MDS Gene Database';

  removeEntry(event: string) {
    const ind = this.dataService.select.indexOf(event)
    this.dataService.select.splice(ind, 1)
    this.dataService.selected.splice(ind, 1)
  }
}
