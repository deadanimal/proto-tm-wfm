import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  

  // Chart
  private chart0: any
  private chart1: any
  private chart2: any


  constructor(
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.getCharts()
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart0) {
          console.log('Chart disposed')
          this.chart0.dispose()
        }
        if (this.chart1) {
          console.log('Chart disposed')
          this.chart1.dispose()
        }
        if (this.chart2) {
          console.log('Chart disposed')
          this.chart2.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartTeamStat()
      this.getChartTeamLoc()
      this.getChartOverallSLA()
    })
  }

  getChartTeamStat() {
    let chart = am4core.create("chartTeamStat", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "On Task",
        value: 401
      },
      {
        country: "On Backup",
        value: 300
      },
      {
        country: "On Idle",
        value: 200
      },
      {
        country: "On Leave",
        value: 165
      }
    ];
    chart.radius = am4core.percent(60);
    chart.innerRadius = am4core.percent(30);
    chart.startAngle = 135;
    chart.endAngle = 405;  

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "country";

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    this.chart0 = chart;
  }

  getChartTeamLoc() {
    let chart = am4core.create("chartTeamLoc", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "KL",
        value: 260
      },
      {
        country: "Selangor",
        value: 230
      },
      {
        country: "Johor",
        value: 200
      },
      {
        country: "Melaka",
        value: 165
      },
      {
        country: "Kelantan",
        value: 139
      },
      {
        country: "Perak",
        value: 128
      }
    ];

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.radiusValue = "value";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;

    series.hiddenState.properties.endAngle = -90;

    //chart.legend = new am4charts.Legend();

    this.chart1 = chart;
  }

  getChartOverallSLA() {
    let chart = am4core.create("chartOverallSLA", am4charts.XYChart);

    // Add percent sign to all numbers
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Add data
    chart.data = [{
        "year": "2016",
        "predicted": 3.5,
        "actual": 4.2
    }, {
        "year": "2017",
        "predicted": 1.7,
        "actual": 3.1
    }, {
        "year": "2018",
        "predicted": 2.8,
        "actual": 2.9
    }, {
        "year": "2019",
        "predicted": 2.6,
        "actual": 2.3
    }, {
        "year": "2020",
        "predicted": 1.4,
        "actual": 2.1
    }, {
        "year": "2021",
        "predicted": 2.6,
        "actual": 4.9
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Achievement";
    //valueAxis.title.fontWeight = 600;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "predicted";
    series.dataFields.categoryX = "year";
    series.clustered = false;
    series.tooltipText = "Predicted achievement : [bold]{valueY}[/]";

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "actual";
    series2.dataFields.categoryX = "year";
    series2.clustered = false;
    series2.columns.template.width = am4core.percent(50);
    series2.tooltipText = "Actual achievement : [bold]{valueY}[/]";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    this.chart2 = chart;
  }

}
