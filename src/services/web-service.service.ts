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
  invitro: string[] = []
  lrrk2Delta: any = {}
  lrrk2Seq: string = ""
  wt: any = {}
  constructor(private http: HttpClient, private dataService: DataService) { }

  getData() {
    this.http.get("assets/MDS GENE database_7March2022.txt", {responseType: "text", observe: "body"}).subscribe(data => {
      if (data) {
        this.data = fromCSV(<string>data)
        this.dataService.selected = this.data.where(row => row["Mutation"] === "p.Ala211Val").bake().toArray()
        this.mutations = this.data.getSeries("Mutation").bake().toArray()
        this.invitro = this.data.getSeries("Interpretation (in vitro)").bake().distinct().toArray()

        for (const m of this.mutations) {
          const result = /p.(\w+)(\d+)(\w+)/.exec(m)
          if (result) {
            this.lrrk2Delta[m] = {origin: result[1], mutant: result[3], position: parseInt(result[2])}
          }
        }
      }
    })
  }

  getLRRK2() {
    this.http.get("https://www.uniprot.org/uniprot/Q5S007.fasta", {responseType: "text", observe: "body"}).subscribe(data => {
      if (data) {
        this.lrrk2Seq = this.parseFasta(data)
      }
    })
  }

  getWT() {
    this.http.get("assets/wt.json", {responseType: "json", observe: "body"}).subscribe(data => {
      if (data) {
        this.wt = data
      }
    })
  }

  parseFasta(data: string) {
    const lines = data.split("\n")
    let seq = ""
    for (const line of lines) {
      if (!line.startsWith(">")) {
        seq = seq + line
      }
    }
    return seq
  }
}
