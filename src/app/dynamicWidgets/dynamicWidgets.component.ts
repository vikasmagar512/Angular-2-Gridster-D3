import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';

import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';


@Component({
  selector: 'app-dynamic-widgets',
  templateUrl: './dynamicWidgets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DynamicWidgetsComponent implements OnInit {
  constructor(){
    this.pieData= [
      { 'name': 'Expiring Soon', 'value': 2 }, { 'name': 'Prolongation', 'value': 4 }, { 'name': 'In Contract', 'value': 3 }
    ];  
    this.lineData= [
      { 'y': 0.4}, { 'y': 0.6}, { 'y': 0.8},    ];

    setTimeout(() => {
      let l = this.lineData.map((k) => ( {...k, y: k['y'] + 0.1}));
      this.lineData = [...l]

      console.log('this.lineData ',this.lineData)
      console.log('this.dashboard ',this.dashboard)

    }, 6000);

  }
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  resizeEvent: EventEmitter<any> = new EventEmitter<any>();
  pieData;
  lineData;
  id:0;

  // gridsterOptions: any = {
  //   lanes: 6,

  //   direction: 'vertical',

  //   dragAndDrop: true,
  //   draggable: {
  //     enabled: true
  //   },
  //   resizable: {
  //     enabled: true
  //   },

  // };

  ngOnInit() {
    this.options = {
      lanes: 6,

      direction: 'vertical',
  
      dragAndDrop: true,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      gridType: GridType.Fit,
      compactType: CompactType.None,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      scrollToNewItems: false,
      disableWarnings: false,
      ignoreMarginInRow: false,
      itemResizeCallback: (item) => {
        // update DB with new size
        // send the update to widgets
        this.resizeEvent.emit(item);
      }
      
    };
    console.log('this.pieData ',this.pieData)
    console.log('this.lineData ',this.lineData)
    this.dashboard = [
      
      {cols: 1, rows: 1, y: 0, x: 2, type: 'line',id:'2', data:this.lineData},
      // {cols: 1, rows: 1, y: 1, x: 0, type: 'pie',id:'1', data:this.pieData},
      {cols: 1, rows: 1, y: 1, x: 1, type: 'pie',id:'3', data:this.pieData},
      // {cols: 2, rows: 2, y: 0, x: 2, type: 'widgetB'},
      // {cols: 2, rows: 1, y: 1, x: 0, type: 'widgetC'},
    ];
    console.log('this.dashboard ',this.dashboard)
  }
  
  addItem() {
    this.id++;
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
  }
}
