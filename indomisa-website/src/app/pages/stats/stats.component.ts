import { Component } from '@angular/core';
import { Stat } from './model/stat';
import { STAT_CONFIG } from './config/stat-config';



@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  readonly stats: Stat[] = STAT_CONFIG;

}