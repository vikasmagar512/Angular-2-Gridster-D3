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
      {cols: 2, rows: 1, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 2}
    ];
    setTimeout(()=>{
      this.pieChart();
    },3000)
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

  pieChart() {

// 2. Use the margin convention practice
    const margin = {top: 50, right: 50, bottom: 50, left: 50}
// , width = window.innerWidth - margin.left - margin.right // Use the window's width
// , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
      , width = 600  - margin.left - margin.right, // Use the window's width
      height =  270 - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
    const n = 21;

// 5. X scale will use the index of our data
    const xScale = d3.scaleLinear()
      .domain([0, n - 1]) // input
      .range([0, width]); // output

// 6. Y scale will use the randomly generate number
    const yScale = d3.scaleLinear()
      .domain([0, 1]) // input
      .range([height, 0]); // output

// 7. d3's line generator
    const line = d3.line()
      .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
      .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
      .curve(d3.curveMonotoneX); // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    const dataset = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)() }; });

// 1. Add the SVG to the page and employ #2
// var svg = d3.select("body")
    d3.select('.pieChart svg').remove();
    const svg = d3.select('.pieChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// 3. Call the x axis in a group tag
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
    svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
    svg.append('path')
      .datum(dataset) // 10. Binds data to the line
      .attr('class', 'line') // Assign a class for styling
      .attr('d', line); // 11. Calls the line generator

// 12. Appends a circle for each datapoint
    svg.selectAll('.dot')
      .data(dataset)
      .enter().append('circle') // Uses the enter().append() method
      .attr('class', 'dot') // Assign a class for styling
      .attr('cx', function(d, i) { return xScale(i); })
      .attr('cy', function(d) { return yScale(d.y); })
      .attr('r', 5)
      .on('mouseover', function(a, b, c) {
        console.log(a);
        this.attr('class', 'focus');
      })
      .on('mouseout', function() {  });
//       .on("mousemove", mousemove);

//   var focus = svg.append("g")
//       .attr("class", "focus")
//       .style("display", "none");

//   focus.append("circle")
//       .attr("r", 4.5);

//   focus.append("text")
//       .attr("x", 9)
//       .attr("dy", ".35em");

//   svg.append("rect")
//       .attr("class", "overlay")
//       .attr("width", width)
//       .attr("height", height)
//       .on("mouseover", function() { focus.style("display", null); })
//       .on("mouseout", function() { focus.style("display", "none"); })
//       .on("mousemove", mousemove);

//   function mousemove() {
//     var x0 = x.invert(d3.mouse(this)[0]),
//         i = bisectDate(data, x0, 1),
//         d0 = data[i - 1],
//         d1 = data[i],
//         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
//     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
//     focus.select("text").text(d);
//   }
  }
}
