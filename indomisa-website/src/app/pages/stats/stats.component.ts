import { Component } from '@angular/core';
import { STAT_CONFIG } from './config/stat-config';
import { Stat } from '../../shared/model/stat';



@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  readonly stats: Stat[] = STAT_CONFIG;

}