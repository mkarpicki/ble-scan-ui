import { IScannerPosition } from "../interfaces/scanner-position.interface";

export const SCANNERS_POSITIONS: IScannerPosition [] = [
    {
      scannerName: "livin-room", 
      mapId: "land-map" ,
      left: 23.5,
      top: 10.6,
      x: 23.5,
      y: 15.4,
      signalMultiplier: 1.1
    },
    {
      scannerName: "garrage", 
      mapId: "land-map",
      left: 3,
      top: 10.6,
      x: 3,
      y: 15.4,
      signalMultiplier: 1
    }
];