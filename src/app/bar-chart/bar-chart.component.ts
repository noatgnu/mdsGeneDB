import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  _data: any = {}


  @Input() set data(value: any) {
    this._data = value
    if (this._data) {
      const data: any = {
        x: [],
        y: [],
        text: [],
        type: "bar",
        marker: {
          color: []
        },
        name: value["Mutation"]
      }

      for (const i in this._data) {
        if (i.startsWith("Replicate")) {
          data.x.push(i)
          data.y.push(this._data[i])
          data.marker.color.push('rgb(199,7,1)')
        }
      }
      this.graphData.push(data)
      this.graphLayout.title = "<b>" + value["Mutation"] + "</b>"
    }
  }

  graphData: any[] = []
  graphLayout: any = {
    xaxis: {
      title: "Replicates",
      visible: true,
    },
    yaxis: {
      title: "pRAB10/RAB10",
      visible: true,
    },
    title: {
      text: this._data["Mutation"],
      font: {
        color: "black"
      }
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
