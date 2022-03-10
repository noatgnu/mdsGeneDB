import {Component, Input, OnInit} from '@angular/core';
import {WebServiceService} from "../../services/web-service.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  _data: any = {}
  wtGraphData: any[] = []

  mutantGraphData: any[] = []
  @Input() set data(value: any) {
    this._data = value
    if (this.web.wt) {
      const data: any = {
        x: [],
        y: [],
        text: [],
        type: "bar",
        marker: {
          color: []
        },
        name: "Wildtype",
        showlegend: false
      }
      for (const i in this.web.wt) {
        if (i.startsWith("Replicate")) {
          data.x.push(i.replace("Replicate", "WT Replicate"))
          data.y.push(this.web.wt[i])
          data.marker.color.push('rgb(199,7,1)')
        }
      }
      this.wtGraphData = data
    }

    if (this._data) {
      const data: any = {
        x: [],
        y: [],
        text: [],
        type: "bar",
        marker: {
          color: []
        },
        name: value["Mutation"],
        showlegend: false
      }
      for (const i in this._data) {
        if (i.startsWith("Replicate")) {
          data.x.push(i.replace("Replicate", "Mutant Replicate"))
          data.y.push(this._data[i])
          data.marker.color.push('rgb(199,7,1)')
        }
      }
      this.mutantGraphData = data
    }
    this.graphData = [this.wtGraphData, this.mutantGraphData]
    this.graphLayout = {
      xaxis: {
        title: "Replicates",
        visible: true,
      },
      yaxis: {
        title: "pRAB10/RAB10",
        visible: true,
      },
      shapes: [
        {
          type: "line",
          xref: "paper",
          yref: "paper",
          x0: 0.5,
          x1: 0.5,
          y0: 0,
          y1: 1,
          line: {
            dash: "dash"
          }
        }
      ],
      annotations: [
        {
          xref: 'paper',
          yref: 'paper',
          x: 0.25,
          xanchor: 'center',
          y: 1.2,
          yanchor: 'top',
          text: "<b>" + 'Wildtype Replicates' + "</b>",
          showarrow: false
        },
        {
          xref: 'paper',
          yref: 'paper',
          x: 0.75,
          xanchor: 'center',
          y: 1.2,
          yanchor: 'top',
          text:"<b>" + this._data["Mutation"] + " Replicates</b>",
          showarrow: false
        }
      ]
    }
  }

  graphData: any[] = []
  graphLayout: any = {}
  constructor(private web: WebServiceService) { }

  ngOnInit(): void {
  }

}
