import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, ViewEncapsulation, OnChanges, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
declare let d3: any;
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit,OnChanges {
  @Input()
  data;  @Input()
  id;
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {  
      let change = changes[propName];
      let curVal  = JSON.stringify(change.currentValue);  
      let prevVal = JSON.stringify(change.previousValue);
       console.log(curVal);
       console.log(prevVal);
    }
 }
  ngOnInit() {
 


    // alert('linechart  ')
    this.lineChart(this.data);
    // setTimeout(() => {
    //   this#lineChart(datails.map((k) => ( {...k, value: k['value'] + 1})));
    // }, 6000);

}
lineChart(data){
    
  var chartDiv = document.getElementById("chart");
  var svg = d3.select(chartDiv).append("svg");

// 2. Use the margin convention practice 
var margin = {top: 50, right: 50, bottom: 50, left: 50}
// , width = window.innerWidth - margin.left - margin.right // Use the window's width 
// , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
, width = 500 - margin.left - margin.right, // Use the window's width 
height= 250 - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = 21;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
.domain([0, n-1]) // input
.range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
.domain([0, 1]) // input 
.range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
.y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
.curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
// var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
let dataset= data;

// 1. Add the SVG to the page and employ #2
// var svg = d3.select("body")
d3.select("#lineChart svg").remove()
var svg = d3.select("#lineChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.attr('width', '100%')
.attr('height', '100%')

.attr('viewBox', '0 20 500 170')
.attr('preserveAspectRatio', 'xMinYMin')
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
.attr("class", "x axis")
// .attr("viewBox", "0 0 500 100")
// .attr("preserveAspectRatio", "xMinYMin meet")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
.attr("class", "y axis")
.call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
.datum(dataset) // 10. Binds data to the line 
.attr("class", "line") // Assign a class for styling 
.attr("d", line); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
.data(dataset)
.enter().append("circle") // Uses the enter().append() method
.attr("class", "dot") // Assign a class for styling
.attr("cx", function(d, i) { return xScale(i) })
.attr("cy", function(d) { return yScale(d.y) })
.attr("r", 5)
  .on("mouseover", function(a, b, c) { 
    console.log(a) 
    this.attr('class', 'focus')
})
  .on("mouseout", function() {  })

}
}
