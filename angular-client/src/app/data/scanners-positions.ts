import { IScannerPosition } from "../interfaces/scanner-position.interface";

export const SCANNERS_POSITIONS: IScannerPosition [] = [
    {
      scannerName: "livin-room", 
      mapId: "land-map" ,
      x: 23.5,
      y: 15.4,
      signalMultiplier: 1.1
    },
    {
      scannerName: "garrage", 
      mapId: "land-map",
      x: 3,
      y: 15.4,
      signalMultiplier: 1
    }
];