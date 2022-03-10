import { Component, OnInit } from '@angular/core';
import {WebServiceService} from "../../services/web-service.service";

@Component({
  selector: 'app-lrrk2-sequence',
  templateUrl: './lrrk2-sequence.component.html',
  styleUrls: ['./lrrk2-sequence.component.css']
})
export class Lrrk2SequenceComponent implements OnInit {
  graphData: any[] = []
  graphLayout: any = {

  }
  constructor(private web: WebServiceService) {

  }

  ngOnInit(): void {
  }

}
