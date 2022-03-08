import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataFrame, fromCSV, IDataFrame} from "data-forge";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  data: IDataFrame = new DataFrame()
  mutations: string[] = []
  constructor(private http: HttpClient, private dataService: DataService) { }

  getData() {
    this.http.get("assets/MDS GENE database_7March2022.txt", {responseType: "text", observe: "body"}).subscribe(data => {
      if (data) {
        this.data = fromCSV(<string>data)
        this.dataService.selected = this.data.where(row => row["Mutation"] === "p.Ala211Val").bake().toArray()
        this.mutations = this.data.getSeries("Mutation").bake().toArray()
        console.log(this.mutations)
      }
    })
  }
}
