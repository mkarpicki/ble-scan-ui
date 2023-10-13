import { Component } from '@angular/core';
import { Scanner } from '../interfaces/scanner.interface';
import { SCANNERS } from '../scanners';

@Component({
  selector: 'app-scanners',
  templateUrl: './scanners.component.html',
  styleUrls: ['./scanners.component.scss']
})
export class ScannersComponent {
  scanners: Scanner [] = SCANNERS;
}
