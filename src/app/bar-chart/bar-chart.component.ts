import {Component, Input, OnInit} from '@angular/core';
import {WebServiceService} from "../../services/web-service.service";
import {Series} from "data-forge";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  _data: any = {}
  wtGraphData: any[] = []
  graphLayout2: any = {}
  mutantGraphData: any[] = []
  _average:boolean = false
  @Input() set average(value: boolean) {
    this._average = value
  }
  @Input() set data(value: any) {
    this._data = value
    this.drawBarChart();
  }

  private drawBarChart() {
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
        name: this._data["Mutation"],
        showlegend: false
      }
      for (const i in this._data) {
        if (i.startsWith("Replicate")) {
          data.x.push(i.replace("Replicate", "Mutant Replicate"))
          if (typeof this._data[i] === "string") {
            this._data[i] = parseFloat(this._data[i])
          }
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
          text: "<b>" + this._data["Mutation"] + " Replicates</b>",
          showarrow: false
        }
      ]
    }
    this.drawAverage()
  }

  graphData: any[] = []
  graphData2: any[] = []
  graphLayout: any = {}
  constructor(private web: WebServiceService) { }

  ngOnInit(): void {
  }

  drawAverage() {
    this.graphData2 = []
    for (const g of this.graphData) {
      const box = {
        x: g.name, y: g.y,
        type: 'box',
        boxpoints: 'all',
        pointpos: 0,
        jitter: 0.3,
        fillcolor: 'rgba(255,255,255,0)',
        line: {
          color: 'rgba(255,255,255,0)',
        },
        hoveron: 'points',
        marker: {
          color: "#654949",
          opacity: 0.8,
        },
        name: g.name,
        //visible: visible,
        showlegend: false
      }
      this.graphData2.push(box)

      const s = new Series(g.y)
      const std =  s.std()
      const standardError = std/Math.sqrt(s.count())
      const mean = s.mean()
      this.graphData2.push({
        x: [g.name], y: [mean],
        type: 'bar',
        mode: 'markers',
        error_y: {
          type: 'data',
          array: [standardError],
          visible: true
        },
        marker: {
          color: ['rgb(199,7,1)']
        },
        //visible: temp[t].visible,
        showlegend: false
      })
    }
    this.graphLayout2 = {
      xaxis: {
        title: "Conditions",
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
          text: "<b>" + 'Wildtype' + "</b>",
          showarrow: false
        },
        {
          xref: 'paper',
          yref: 'paper',
          x: 0.75,
          xanchor: 'center',
          y: 1.2,
          yanchor: 'top',
          text: "<b>" + this._data["Mutation"] + "</b>",
          showarrow: false
        }
      ]
    }
    console.log(this.graphData2)
  }
}
