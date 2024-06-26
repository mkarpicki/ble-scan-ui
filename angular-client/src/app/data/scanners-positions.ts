import { IScannerPosition } from "../interfaces/scanner-position.interface";

export const SCANNERS_POSITIONS: IScannerPosition [] = [
    {
      scannerName: "livin-room", 
      mapId: "land-map" ,
      x: 23.5,
      y: 15.4,
      measuredPowerOneMeter: -63 //-64
    },
    {
      scannerName: "garrage", 
      mapId: "land-map",
      x: 3,
      y: 15.4,
      measuredPowerOneMeter: -63 //-80
    },
    {
      scannerName: '3rd',
      mapId: "land-map",
      x: 34,
      y: 6,
      measuredPowerOneMeter: -80 //to test
    }
];

export function findScannerPositionOnMap(name: string, mapId: string): IScannerPosition | undefined {
  return SCANNERS_POSITIONS.find(position => {
    return (position.scannerName === name && position.mapId === mapId);
  });
}