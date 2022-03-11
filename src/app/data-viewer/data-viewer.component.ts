import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {
  _data: any = {}
  averageTrigger: boolean = false
  @Input() set data(value: any) {
    this._data = value
  }
  @Output() closeEntry: EventEmitter<string> = new EventEmitter<string>()
  close() {
    this.closeEntry.emit(this._data["Mutation"])
  }
  constructor() { }

  ngOnInit(): void {
  }

  viewAverage() {
    this.averageTrigger = !this.averageTrigger
  }
}
