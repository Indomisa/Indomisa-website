import { Component } from '@angular/core';
import { PROCESS_STEPS } from './config/process-step-config';
import { ProcessStep } from './model/process-step';

@Component({
  selector: 'app-process-section',
  standalone: true,
  templateUrl: './process-section.component.html',
  styleUrls: ['./process-section.component.scss']
})
export class ProcessSectionComponent {

  readonly steps: ProcessStep[] = PROCESS_STEPS; 

}