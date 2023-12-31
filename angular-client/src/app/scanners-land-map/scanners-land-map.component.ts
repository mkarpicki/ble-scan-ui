import { 
  Component, 
  ViewChild, 
  ElementRef, 
  AfterViewInit, 
  OnChanges, 
  Input,
  SimpleChanges
} from '@angular/core';


import { DistanceCalculatorService } from '../services/distance-calculator.service';
import { Feed } from '../types/thingspeak/feed';

import { IPosition } from '../interfaces/position.interface';
import { IScanner } from '../interfaces/scanner.interface';

import { POSITIONS } from '../data/positions';
import { SCANNERS } from '../data/scanners';


@Component({
  selector: 'app-scanners-land-map',
  templateUrl: './scanners-land-map.component.html',
  styleUrls: ['./scanners-land-map.component.scss']
})
export class ScannersLandMapComponent implements AfterViewInit, OnChanges {

  @ViewChild("scannersLandMap", { static: false }) scannersLandMap?: ElementRef;

  @Input() feeds?: Feed[] = [];

  @Input() width: number = 400;
  @Input() height: number = 300;
  @Input() mapId: string = '';

  constructor(private distanceCalculatorService: DistanceCalculatorService) {}

  private canvas?: HTMLCanvasElement;

  private scanners: IScanner[] = SCANNERS;
  private positions: IPosition[] = POSITIONS;

  private context : any;
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
    radius: 0.5,
    color: '#00008B'
  };

  private flowerBeds = [
    {
      topShift: 4,
      leftShift: 11,
      sizeY: 4.2 / 2, 
      sizeX: 7.6 / 2
    }
  ];

  private zoom(dimention: number) {
    return this.getZoomLevel() * dimention;
  }

  private getZoomLevel() {
    return (this.width / this.land.width);
    //in case I build mor egeneric component and I consider this.land.width < this.land.height
    //then this method should calculate on height operation
  }

  private getHousePosion() {
    return {
      left: this.landShift.left + this.houseShift.left,
      top: this.landShift.top + this.houseShift.top
    };
  };

  private findScannerByAddress (address: string): IScanner | undefined {
    
    return this.scanners?.find(scanner => {
      return (scanner.address === address);
    });   
  };

  private drawObjects (objects: any[] | undefined) {
    objects?.forEach(o => {
      this.context.strokeStyle = o.color;
      this.context.beginPath();
      this.context.arc(
        this.zoom( this.landShift.left + o.left ), 
        this.zoom( this.landShift.top + o.top ), 
        this.zoom(o.radius), 
        0, 
        2 * Math.PI
      );
      this.context.stroke();
    });   
  };

  private findScannerPositionOnMap(scanner: IScanner): IPosition | undefined {

    return this.positions.find(position => {
      return (position.scannerName === scanner.name && position.mapId === this.mapId);
    });
  }

  private drawScanners(scanners: IScanner[] | undefined) {

    if (!scanners) {
      return;
    }

    let scannersToDraw: any[] = []; 
    scanners.forEach(scanner => {
      let position = this.findScannerPositionOnMap(scanner);
      if (position) {
        scannersToDraw.push({
          color: this.scannerComponentUI.color,
          radius: this.scannerComponentUI.radius,
          left: position.left,
          top: position.top
        });
      }
    }) ;
    this.drawObjects(scannersToDraw);
  }

  private drawDistances(feeds: Feed[] | undefined) {
          
    let signalsToDraw: any[] = [];
    feeds?.forEach(feed => {
        let scanner = this.findScannerByAddress(feed.scannerMacAddress());
        if (scanner) {
          let position = this.findScannerPositionOnMap(scanner);
          if (position) {
            let distance = this.distanceCalculatorService.calculate(feed.rssi(), scanner);
            signalsToDraw.push({
                color: this.signalColor,
                left: position.left,
                top: position.top,
                radius: distance
            });
          }
        }
    });
    this.drawObjects(signalsToDraw);
      
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

    this.drawFlowerBeds();

    this.drawScanners(this.scanners);
    this.drawDistances(this.feeds);
    
  }

  drawFlowerBeds() {
    this.flowerBeds.forEach(flowerBed => {
      this.context.strokeStyle = '#000000';
      this.context.beginPath();

      this.context.ellipse(
        this.zoom( this.landShift.left + flowerBed.leftShift ), 
        this.zoom( this.landShift.top + flowerBed.topShift),  
        this.zoom( flowerBed.sizeX ), 
        this.zoom( flowerBed.sizeY) , 
        0, 
        0, 
        2 * Math.PI
      );
      this.context.stroke();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // todo
    // I do not need to watch those but curious to check why scanners dissapear on updates
    //this.beacon = changes['beacon']?.currentValue; 
    //this.scanners = changes['scanners']?.currentValue;
    this.feeds = changes['feeds']?.currentValue;
    this.render();
  }

  ngAfterViewInit(): void {
    this.canvas = this.scannersLandMap?.nativeElement;
    this.context = this.canvas?.getContext("2d");
    this.render();
  }

}
