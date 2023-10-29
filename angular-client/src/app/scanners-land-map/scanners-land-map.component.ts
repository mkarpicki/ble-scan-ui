import { 
  Component, 
  ViewChild, 
  ElementRef, 
  AfterViewInit, 
  OnChanges, 
  Input,
  SimpleChanges
} from '@angular/core';
import { IBeacon } from '../interfaces/beacon.interface';
import { IScanner } from '../interfaces/scanner.interface';

@Component({
  selector: 'app-scanners-land-map',
  templateUrl: './scanners-land-map.component.html',
  styleUrls: ['./scanners-land-map.component.scss']
})
export class ScannersLandMapComponent implements AfterViewInit, OnChanges {

  @ViewChild("scannersLandMap", { static: false }) scannersLandMap?: ElementRef;

  @Input() beacon?: IBeacon;
  @Input() scanners?: IScanner[];

  @Input() width: number = 400;
  @Input() height: number = 300;

  private canvas?: HTMLCanvasElement;

  private context : any;
  private zoomLevel: number = 10;
  private signalColor = '#27AE60';

  private landShift = {
    left: 0,
    top: 0
  };

  private land = {
      width: 36,
      height: 26
  };
  private house = {
      width: 19,
      height: 10.5
  };
  private houseShift = {
      left: 5.5,
      top: 10.6
  }

  private scannerComponentUI = {
    radius: 5,
    color: '#00008B'
  };

  private zoom(dimention: number) {
      return this.zoomLevel * dimention;
  }

  private getHousePosion() {
      return {
          left: this.landShift.left + this.houseShift.left,
          top: this.landShift.top + this.houseShift.top
      };
  };

  private findScanner (id: string): any {
    let found;
    this.scanners?.forEach(scanner => {
        if(scanner.name === id) {
            found = scanner;
        }
    });
    return found;
  };

  private drawObjects (objects: any[] | undefined) {
    objects?.forEach(o => {
      this.context.strokeStyle = o.color;
      this.context.beginPath();
      this.context.arc(
          this.zoom( this.landShift.left + o.left ), 
          this.zoom( this.landShift.top + o.top ), 
          o.radius, 
          0, 
          2 * Math.PI
      );
      this.context.stroke();
    });   
  };

  private drawScanners(scanners: IScanner[] | undefined) {

    if (!scanners) {
      return;
    }

    let scannersToDraw: any[] = []; 
    scanners.forEach(scanner => {
      scannersToDraw.push({
        color: this.scannerComponentUI.color,
        radius: this.scannerComponentUI.radius,
        left: scanner.left,
        top: scanner.top
      })
    }) ;
    this.drawObjects(scannersToDraw);
  }

  private drawSignals(signals: any[]) {
      if (signals && signals.length) {
          
          let signalsToDraw: any[] = [];
          signals.forEach(signal => {
              let scanner = this.findScanner(signal.id);
              if (scanner) {
                  signalsToDraw.push({
                      color: this.signalColor,
                      left: scanner.left,
                      top: scanner.top,
                      radius: signal.radius
                  });
              }
          });
          this.drawObjects(signalsToDraw);
      }
  };

  private render () {

    if (!this.context) {
      return;
    }

    this.context.clearRect(0, 0, this.canvas?.width, this.canvas?.height);
    this.context.lineWidth = 1;

    /* render land */
    this.context.strokeStyle = '#000000';
    this.context.strokeRect(
        this.zoom(this.landShift.left), 
        this.zoom(this.landShift.top), 
        this.zoom(this.land.width), 
        this.zoom(this.land.height)
    );

    /* render house */
    this.context.strokeStyle = '#000000';
    this.context.strokeRect(
        this.zoom(this.getHousePosion().left), 
        this.zoom(this.getHousePosion().top), 
        this.zoom(this.house.width), 
        this.zoom(this.house.height)
    );

    /* simulate line with parking on left */
    this.context.strokeStyle = '#000000';
    this.context.beginPath();
    this.context.moveTo(
        this.zoom(this.landShift.left), 
        this.zoom(this.getHousePosion().top)
    );
    this.context.lineTo(
        this.zoom(this.getHousePosion().left), 
        this.zoom(this.getHousePosion().top)
    );
    this.context.stroke();
    this.context.closePath();

    /* simulate line with parking on right*/
    this.context.strokeStyle = '#000000';
    this.context.beginPath();
    this.context.moveTo(
        this.zoom(this.getHousePosion().left + this.house.width), 
        this.zoom(this.getHousePosion().top + this.house.height)
    );
    this.context.lineTo(
      this.zoom(this.landShift.left + this.land.width),
      this.zoom(this.getHousePosion().top + this.house.height)
    );
    this.context.stroke();
    this.context.closePath();

    this.drawScanners(this.scanners);

    //drawSignals(context, window.signals);
    
  }


  ngOnChanges(changes: SimpleChanges) {
    this.beacon = changes['beacon']?.currentValue; 
    this.scanners = changes['scanners']?.currentValue;
    this.render();
  }

  ngAfterViewInit(): void {
    this.canvas = this.scannersLandMap?.nativeElement;
    this.context = this.canvas?.getContext("2d");
    this.render();
  }

}
