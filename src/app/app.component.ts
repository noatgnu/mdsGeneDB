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
  })

  form2: FormGroup = this.fb.group({
    invitro: ""
  })
  constructor(public web: WebServiceService, public dataService: DataService, private fb: FormBuilder) {
    this.web.getWT()
    this.web.getData()
    this.web.getLRRK2()
    this.form2.valueChanges.subscribe(values => {
      if (values.invitro) {
        const results = this.web.data.where(row => row["Interpretation (in vitro)"] === values.invitro).bake()
        const a = results.getSeries("Mutation").bake().toArray()
        this.form.setValue({mutations: a})
      }
      console.log(values)
    })
  }

  title = 'MDS Gene Database';

  removeEntry(event: string) {
    const ind = this.dataService.select.indexOf(event)
    this.dataService.select.splice(ind, 1)
    this.dataService.selected.splice(ind, 1)
  }

  selectMutants() {
    const results = this.web.data.where(row => this.form.value["mutations"].includes(row["Mutation"])).bake()
    for (const r of results) {
      if (!this.dataService.select.includes(r["Mutation"])) {
        this.dataService.select.push(r["Mutation"])
        this.dataService.selected.push(r)
      }
    }
  }
}
