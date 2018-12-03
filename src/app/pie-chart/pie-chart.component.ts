import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, ViewEncapsulation, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs';
declare let d3: any;


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})



export class PieChartComponent implements OnInit {
  @Input()
  data;
    @Input()
  id;
  ngOnInit() {
 


    // setTimeout(() => {
    //   this.bubbleChart();
    // }, 3000);
    // const datails = [
    //   { 'name': 'Expiring Soon', 'value': 2 }, { 'name': 'Prolongation', 'value': 4 }, { 'name': 'In Contract', 'value': 3 }
    // ];

    // this.pieChart(this.data);
    setTimeout(() => {
      // this.pieChart(datails.map((k) => ( {...k, value: k['value'] + 1})));
      this.pieChart(this.data);

    }, 6000);
  }
  node: string;
  constructor(private elementRef: ElementRef) { }
  
  ngAfterContentInit() {
    // alert(this.id)
    const tmp = document.createElement('div');
    tmp.setAttribute("class", `pieChart${this.id}`);
    const el = this.elementRef.nativeElement.cloneNode(true);
    
    tmp.appendChild(el);
    // this.node = tmp.innerHTML;
  }


  pieChart(data) {
    //debugger;
    const text = '';
    const width = 100;
    const height = 100;
    const thickness = 40;
    const duration = 750;
    const padding = 10;
    const opacity = .8;
    const opacityHover = 1;
    const otherOpacityOnHover = .8;
    const tooltipMargin = 13;

    const radius = Math.min(width - padding, height - padding) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // d3.select(`.pieChart${this.id}`).html(`<div id='piechart${this.id}'></div>`);
    d3.select(`.pieChart`).html(`<div id='piechart${this.id}'></div>`);
    d3.select(`#piechart${this.id} svg`).remove();
    d3.select(`#piechart${this.id} .legend`).remove();

    /////////////////////////////////////////////////////////////////////////
    // d3.json(this.pieChartData, function (error, data) {
    // d3.json("./assets/pieData.json", function (error, data) {
    //debugger;
    // alert('pieData loaded')
    console.log('pieData loaded', data);
    const svg = d3.select(`#piechart${this.id}`)
      .append('svg')
      .attr('class', 'pie')
      // .attr('width', width)
      // .attr('height', height)
      .attr('width', '100%')
      .attr('height', '100%')

      .attr('viewBox', '-50 0 200 100')
      .attr('preserveAspectRatio', 'xMinYMin');;

    const g = svg.append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const pie = d3.pie()
      .value(function (d) { return d['value']; })
      .sort(null);

    const path = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('g')
      .append('path')
      .attr('d', arc)
      .attr('fill', ((d, i) => {
        // alert(d.data.name)
        // alert(d.value)
        if (d.data.name === 'Expiring Soon') {
          return '#D75A4A';
        } else if (d.data.name === 'In Contract') {
          return '#87CE7A';
             } else if (d.data.name === 'Prolongation') {
          return '#FFF147';
             }
      }))
      .style('opacity', opacity)
      .on('click', function() {
        alert('You clicked circle');
      })
      .on('mouseover', function (d) {
        d3.selectAll('path')
          .style('opacity', otherOpacityOnHover);
        d3.select(this)
          .style('opacity', opacityHover);

        const g = d3.select('#piechart svg')
          .style('cursor', 'pointer')
          .append('g')
          .attr('class', 'tooltip')
          .style('opacity', 0);

        g.append('text')
          .attr('class', 'name-text')
          .text(`${d.data['name']} (${d.data['value']})`)
          .attr('text-anchor', 'middle');

        const text = g.select('text');
        const bbox = text.node().getBBox();
        const padding = 2;
        g.insert('rect', 'text')
          .attr('x', bbox.x - padding)
          .attr('y', bbox.y - padding)
          .attr('width', bbox.width + (padding * 2))
          .attr('height', bbox.height + (padding * 2))
          .style('fill', '#F3ECEC')
          .style('opacity', 0.75);
      })
      .on('mousemove', function (d) {
        const mousePosition = d3.mouse(this);
        let x = mousePosition[0] + width / 2;
        let y = mousePosition[1] + height / 2 - tooltipMargin;

        const text = d3.select('.tooltip text');
        const bbox = text.node().getBBox();
        if (x - bbox.width / 2 < 0) {
          x = bbox.width / 2;
        } else if (width - x - bbox.width / 2 < 0) {
          x = width - bbox.width / 2;
        }

        if (y - bbox.height / 2 < 0) {
          y = bbox.height + tooltipMargin * 2;
        } else if (height - y - bbox.height / 2 < 0) {
          y = height - bbox.height / 2;
        }

        d3.select('.tooltip')
          .style('opacity', 1)
          .attr('transform', `translate(${x}, ${y})`);
      })
      .on('mouseout', function (d) {
        d3.select('.piechart svg')
          .style('cursor', 'none')
          .select('.tooltip').remove();
        d3.selectAll('path')
          .style('opacity', opacity);
      })
      .on('touchstart', function (d) {
        d3.select('.piechart svg')
          .style('cursor', 'none');
      })
      .each(function (d, i) { this._current = i; });


    const legend = d3.select('.piechart').append('div')
      .attr('class', 'legend')
      // .style('margin-top', '50px');
      .style('float', 'right');

    const keys = legend.selectAll('.key')
      .data(data)
      .enter().append('div')
      .attr('class', 'key')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('margin-right', '20px');

    keys.append('div')
      .attr('class', 'symbol')
      .style('height', '10px')
      .style('width', '10px')
      .style('margin', '5px 5px')
      .style('border-radius', '50%')
      .style('background-color', ((d, i) => {
        // alert(d.data.name)
        // alert(d.value)
        if (d.name == 'Expiring Soon') {
          return '#D75A4A';
        } else if (d.name == 'In Contract') {
          return '#87CE7A';
             } else if (d.name == 'Prolongation') {
          return '#FFF147';
             }
      }));

    keys.append('div')
      .attr('class', 'name')
      .text(d => `${d['name']} (${d['value']})`);

    keys.exit().remove();
    // });
  }
}
