import { Component } from '@angular/core';
import { ChartData, ChartDataset, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [
  ]
})
export class Graficas1Component {
  labels1: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  dataSetDona: ChartDataset<'doughnut'>[] = [
    { data: [250, 130, 70], backgroundColor: ['#6857E6', '#009FEE', '#F02059'], label: 'Dataset 1' },
    // { data: [350, 450, 100], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], label: 'Dataset 2' },
    // { data: [50, 150, 120], backgroundColor: ['#9E120', '#FF5800', '#FFB414' ], label: 'Dataset 3' }
  ];
  dataSetPie: ChartDataset<'pie'>[] = [
    { data: [250, 130, 70], backgroundColor: ['#6857E6', '#009FEE', '#F02059'], label: 'Dataset 1' },
    // { data: [350, 450, 100], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], label: 'Dataset 2' },
    // { data: [50, 150, 120], backgroundColor: ['#9E120', '#FF5800', '#FFB414' ], label: 'Dataset 3' }
  ];
  dataSetBar: ChartDataset<'bar'>[] = [
    { data: [250, 130, 70], backgroundColor: ['#6857E6', '#009FEE', '#F02059'], label: 'Dataset 1' },
    // { data: [350, 450, 100], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], label: 'Dataset 2' },
    // { data: [50, 150, 120], backgroundColor: ['#9E120', '#FF5800', '#FFB414' ], label: 'Dataset 3' }
  ];
  dataSetLine: ChartDataset<'line'>[] = [
    { data: [250, 130, 70], backgroundColor: ['#6857E6', '#009FEE', '#F02059'], label: 'Dataset 1' },
    // { data: [350, 450, 100], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], label: 'Dataset 2' },
    // { data: [50, 150, 120], backgroundColor: ['#9E120', '#FF5800', '#FFB414' ], label: 'Dataset 3' }
  ];

  dataDona: ChartData<'doughnut'> = { labels: this.labels1, datasets: this.dataSetDona };
  dataPie: ChartData<'pie'> = { labels: this.labels1, datasets: this.dataSetPie };
  dataBar: ChartData<'bar'> = { labels: this.labels1, datasets: this.dataSetBar };
  dataLine: ChartData<'line'> = { labels: this.labels1, datasets: this.dataSetLine };
}
