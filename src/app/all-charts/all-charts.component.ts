import { Component, OnInit, Input, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-charts',
  templateUrl: './all-charts.component.html',
  styleUrls: ['./all-charts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AllChartsComponent implements OnInit,OnChanges {

  constructor() { }
  @Input()
  data;
   @Input()
  type;
   @Input()
  id;


  ngOnInit() {
    // debugger
    console.log('this.data ',this.data)
    console.log('this.type ',this.type)
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {  
      let change = changes[propName];
      let curVal  = JSON.stringify(change.currentValue);    
      let prevVal = JSON.stringify(change.previousValue);
       console.log('AllCharts',curVal);
       console.log('AllCharts',prevVal);
    }
 }
  

}
