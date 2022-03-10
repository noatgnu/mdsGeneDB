import { Component } from '@angular/core';
import {WebServiceService} from "../services/web-service.service";
import {DataService} from "../services/data.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup = this.fb.group({
    mutations: [],
    invitro: "",
  })

  constructor(public web: WebServiceService, public dataService: DataService, private fb: FormBuilder) {
    this.web.getWT()
    this.web.getData()
    this.web.getLRRK2()
  }

  title = 'MDS Gene Database';

  removeEntry(event: string) {
    const ind = this.dataService.select.indexOf(event)
    this.dataService.select.splice(ind, 1)
    this.dataService.selected.splice(ind, 1)
  }

  selectMutants() {
    const selected: string[] = []
    for (const i of this.form.value["mutations"]) {
      if (!this.dataService.select.includes(i)) {
        selected.push(i)
      }
    }

    const results = this.web.data.where(row => selected.includes(row["Mutation"])).bake()
    for (const r of results) {
      if (this.form.value["invitro"] !== "") {
        if (r["Interpretation (in vitro)"] === this.form.value["invitro"]) {
          this.dataService.selected.push(r)
          this.dataService.select.push(r["Mutation"])
        }
      } else {
        this.dataService.selected.push(r)
        this.dataService.select.push(r["Mutation"])
      }

    }
  }
}
