import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-management-sla',
  templateUrl: './management-sla.component.html',
  styleUrls: ['./management-sla.component.scss']
})
export class ManagementSlaComponent implements OnInit {

  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-lg modal-dialog-centered"
  };

  private chart0;
  private chart1;
  private chart2;

  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any = [
    {
      prioLvL: "1",
      prioDesc: "ThiSisDescRiPTioN",
      faultType: "Wiring",
      timeResp: "0.2",
      timeResto: "1.3",
      timePermaFix: "3"

    },
    {
      prioLvL: "2",
      prioDesc: "ThiSisDescRiPTioN",
      faultType: "Wiring",
      timeResp: "0.2",
      timeResto: "1.3",
      timePermaFix: "3"
    },
    {
      prioLvL: "3",
      prioDesc: "ThiSisDescRiPTioN",
      faultType: "Wiring",
      timeResp: "0.2",
      timeResto: "1.3",
      timePermaFix: "3"
    },
    {
      prioLvL: "4",
      prioDesc: "ThiSisDescRiPTioN",
      faultType: "Wiring",
      timeResp: "0.2",
      timeResto: "1.3",
      timePermaFix: "3"
    },
    {
      prioLvL: "5",
      prioDesc: "ThiSisDescRiPTioN",
      faultType: "Wiring",
      timeResp: "0.2",
      timeResto: "1.3",
      timePermaFix: "3"
    }
  ]
  SelectionType = SelectionType;

  tEntries: number = 5;
  tSelected: any[] = [];
  tTemp = [];
  tActiveRow: any;
  tRows: any = [
    {
      teamName: "Eagle4",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Eagle5",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Turtle7",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Lion7",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Phoenix1",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Lion3",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Tiger7",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Dragon1",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Phoenix8",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Eagle5",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Turtle9",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    },
    {
      teamName: "Tiger1",
      slaHigh: "24",
      slaMed: "50",
      slaLow: "3",
    }
  ]
  tSelectionType = SelectionType;

  constructor(
    private modalService: BsModalService,
    private zone: NgZone
  ) {
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });
    this.tTemp = this.tRows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });
  }

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
      this.getChartSLAAchieve()
      this.getChartNumTaskPrio()
    })
  }


  getChartSLAAchieve() {
    let chart = am4core.create('chartSLAAchieve', am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'category'
      series.name = name

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.dy = 30;
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')

      return series;
    }

    chart.data = [
      {
        category: 'LvL1',
        first: 40,
        second: 55,
        third: 60
      },
      {
        category: 'LvL2',
        first: 30,
        second: 78,
        third: 69
      },
      {
        category: 'LvL3',
        first: 27,
        second: 40,
        third: 45
      },
      {
        category: 'LvL4',
        first: 50,
        second: 33,
        third: 22
      },
      {
        category: 'LvL5',
        first: 50,
        second: 33,
        third: 22
      }
    ]

    createSeries('first', 'High');
    createSeries('second', 'Medium');
    createSeries('third', 'Low');

    function arrangeColumns() {

      let series = chart.series.getIndex(0);

      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function(series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            }
            else {
              series.dummyData = chart.series.indexOf(series);
            }
          })
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function(series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          })
        }
      }
    }

    this.chart0 = chart;
  }

  getChartNumTaskPrio() {
    let chart = am4core.create("chartNumTaskPrio", am4charts.XYChart);

    // Add data
    chart.data = [{
      "level": "LvL1",
      "visits": 2025
    }, {
      "level": "LvL2",
      "visits": 1882
    }, {
      "level": "LvL3",
      "visits": 1809
    }, {
      "level": "LvL4",
      "visits": 1322
    }, {
      "level": "LvL5",
      "visits": 1122
    }];

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "level";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index & +true ) {
        return dy + 25;
      }
      return dy;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "level";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }

  getChartSingleTeamSLA() {
    let chart = am4core.create("chartSingleTeamSLA", am4charts.XYChart);
    
    // Add data
    chart.data = [
      {
        "month": "High",
        "visits": 2025
      }, {
        "month": "Medium",
        "visits": 1882
      }, {
        "month": "Low",
        "visits": 1509
      }
    ];

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index & +true) {
        return dy + 25;
      }
      return dy;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "month";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    this.chart2 = chart;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
    this.getChartSingleTeamSLA()
  }

  closeModal() {
    this.modal.hide()
    //this.registerForm.reset()
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  ontActivate(event) {
    this.tActiveRow = event.row;
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  entriesChange1($event) {
    this.tEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  filterTable1($event) {
    let val = $event.target.value;
    this.tTemp = this.tRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

}
