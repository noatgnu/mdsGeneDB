import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {WebServiceService} from "../../services/web-service.service";
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {
  selectedMutationModel: string = ""

  selectedMutation: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.searchFilter(term))
    )

  constructor(public web: WebServiceService, private dataService: DataService) {

  }

  ngOnInit(): void {
  }

  searchFilter(term: string) {
    return this.web.mutations.filter(v => v.toLowerCase().indexOf(term.toLowerCase())>-1).slice(0,20)
  }

  selectData() {
    if (this.dataService.select.includes(this.selectedMutationModel)) {
      console.log("Already Selected")
      this.dataService.scrollToID(this.selectedMutationModel+"id")
    } else {
      const results = this.web.data.where(row => row["Mutation"] === this.selectedMutationModel).bake()
      for (const r of results) {
        this.dataService.selected.push(r)
      }
      this.dataService.scrollToID(this.selectedMutationModel+"id")
    }

  }
}
