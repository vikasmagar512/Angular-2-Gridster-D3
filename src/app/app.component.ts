import {Component, OnInit} from '@angular/core';
declare let d3: any;
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  gridsterOptions: any = {
    lanes: 6,

    direction: 'vertical',

    dragAndDrop: true,
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: true
    },

  };
  showToolBar = false;
  title = 'Angular2Gridster';
  widgets: any = [
    {
      x: 0, y: 0, w: 1, h: 1,
      title: 'Basic form inputs 1',
      content: 'Lorem ipsum dolor sit amet, '
    },
   {
      x: 0, y: 1, w: 1, h: 1,
      title: 'Basic form inputs 2',
      content: 'Lorem ipsum dolor sit amet, '
    },
    /*{
     x: 0, y: 2, w: 1, h: 1,
     title: 'Basic form inputs 3',
     content: 'Lorem ipsum dolor sit amet, '
   },
   {
     x: 0, y: 3, w: 1, h: 1,
     title: 'Basic form inputs 4',
     content: 'Lorem ipsum dolor sit amet,'
   }*/
  ];




  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }

  ngOnInit() {
    this.options = {
      itemChangeCallback: AppComponent.itemChange,
      itemResizeCallback: AppComponent.itemResize,
    };

    this.dashboard = [
      {cols: 0, rows: 0, y: 0, x: 0},
      {cols: 1, rows: 1, y: 0, x: 2}
    ];

  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }
 /* addItem() {
    this.dashboard.push({});
  }*/



  swapTiles() {
    this.widgets = this.widgets.slice(1, 4);
    /*this.widgets.push(
      {
          x: 0, y: 0, w: 1, h: 1,
          title: 'Basic form inputs 1',
          content: 'Lorem ipsum dolor sit amet, '
      });*/
  }
  removeLine(gridster) {
    gridster.setOption('lanes', --this.gridsterOptions.lanes)
      .reload();
  }
  addLine(gridster) {
    gridster.setOption('lanes', ++this.gridsterOptions.lanes)
      .reload();
  }
  setWidth(widget: any, size: number, e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (size < 1) {
      size = 1;
    }
    widget.w = size;

    return false;
  }

  setHeight(widget: any, size: number, e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (size < 1) {
      size = 1;
    }
    widget.h = size;

    return false;

    
  }

 
}
