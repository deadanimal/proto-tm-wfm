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
  selector: 'app-management-team',
  templateUrl: './management-team.component.html',
  styleUrls: ['./management-team.component.scss']
})
export class ManagementTeamComponent implements OnInit {

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
      teamName: "Eagle",
      leaderName: "Zenaida Frank",
      teamLoc: "KL",
      teamTask: "FibreWire",
      teamStat: "1"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "3"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "2"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "3"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "5"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "3"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "2"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "4"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "1"
    },
    {
      teamName: "Phoenix",
      leaderName: "Frank Zenaida",
      teamLoc: "Selangor",
      teamTask: "FixRouter",
      teamStat: "2"
    }
  ]
  SelectionType = SelectionType;
  
  tEntries: number = 5;
  tSelected: any[] = [];
  tTemp = [];
  tActiveRow: any;
  tRows: any = [
    {
      staffName: "Hafizi Imran",
      location: "KL",
      contact: "hafiziimran@gmail.com",
      position: "Engineer",
      status: "2"
    },
    {
      staffName: "Ali Safawi",
      location: "P. Pinang",
      contact: "alisafawi@gmail.com",
      position: "Secretary",
      status: "1"
    },
    {
      staffName: "Hafizi Imran",
      location: "KL",
      contact: "hafiziimran@gmail.com",
      position: "Engineer",
      status: "2"
    },
    {
      staffName: "Ali Safawi",
      location: "P. Pinang",
      contact: "alisafawi@gmail.com",
      position: "Secretary",
      status: "1"
    },
    {
      staffName: "Hafizi Imran",
      location: "KL",
      contact: "hafiziimran@gmail.com",
      position: "Engineer",
      status: "2"
    },
    {
      staffName: "Ali Safawi",
      location: "P. Pinang",
      contact: "alisafawi@gmail.com",
      position: "Secretary",
      status: "1"
    },
    {
      staffName: "Hafizi Imran",
      location: "KL",
      contact: "hafiziimran@gmail.com",
      position: "Engineer",
      status: "2"
    },
    {
      staffName: "Ali Safawi",
      location: "P. Pinang",
      contact: "alisafawi@gmail.com",
      position: "Secretary",
      status: "1"
    },
    {
      staffName: "Hafizi Imran",
      location: "KL",
      contact: "hafiziimran@gmail.com",
      position: "Engineer",
      status: "2"
    },
    {
      staffName: "Ali Safawi",
      location: "P. Pinang",
      contact: "alisafawi@gmail.com",
      position: "Secretary",
      status: "1"
    },
  ]

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
      this.getChartTeamDistrib()
      this.getChartTotTeamMem()
    })
  }

  getChartTeamDistrib() {
    let chart = am4core.create("chartTeamDistrib", am4charts.PieChart);
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
    
    this.chart0 = chart;
  }

  getChartTotTeamMem() {
    let chart = am4core.create("chartTotTeamMem", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        "month": "5-member",
        "visits": 2025
      }, {
        "month": "4-member",
        "visits": 1882
      }, {
        "month": "3-member",
        "visits": 1509
      } , {
        "month": "2-member",
        "visits": 2322
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

    this.chart1 = chart;
  }

  getChartTeamSLA() {
    let chart = am4core.create("chartTeamSLA", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        rating: "High",
        value: 12
      },
      {
        rating: "Medium",
        value: 52
      },
      {
        rating: "Low",
        value: 3
      }
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;  

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "rating";

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    chart.legend = new am4charts.Legend();
  }

  openModal0(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
    this.getChartTeamSLA()
  }

  openModal1(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }


  closeModal() {
    this.modal.hide()
    //this.registerForm.reset()
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) != -1) {
          return d;
        }
      }
      return false;
    });
  }

  onTActivate(event) {
    this.tActiveRow = event.row;
  }

  entriesTChange($event) {
    this.tEntries = $event.target.value;
  }

  filterTTable($event) {
    
    let val = $event.target.value;
    this.tTemp = this.tRows.filter(function (d) {
      for (var key in d) {
        if (/*isNaN(d[key]) && */d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

}
