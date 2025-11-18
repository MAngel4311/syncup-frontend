import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartOptions, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { AdminService, AdminDashboardMetricsDto, ChartDataDto } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    MatCardModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {

  metrics: AdminDashboardMetricsDto | null = null;
  
  pieChartOptions: ChartOptions = { responsive: true, maintainAspectRatio: false };
  pieChartLabels: string[] = [];
  pieChartData: any[] = [ { data: [] } ];

  barChartOptions: ChartOptions = { responsive: true, maintainAspectRatio: false };
  barChartLabels: string[] = [];
  barChartData: any[] = [{ data: [], label: 'Canciones' }];

  constructor(private adminService: AdminService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.adminService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
        this.setupCharts(data);
      },
      error: (err) => console.error('Error al cargar métricas:', err)
    });
  }

  setupCharts(data: AdminDashboardMetricsDto): void {
    this.pieChartLabels = data.generoChartData.map(d => d.label);
    this.pieChartData = [
      { data: data.generoChartData.map(d => d.value) }
    ];

    this.barChartLabels = data.artistaChartData.map(d => d.label);
    this.barChartData = [{
      data: data.artistaChartData.map(d => d.value),
      label: 'Canciones',
      backgroundColor: '#4CAF50'
    }];
  }
}