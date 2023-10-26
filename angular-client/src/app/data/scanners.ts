import { IScanner } from "../interfaces/scanner.interface";
import { IPosition } from "../interfaces/position.interface";

export const SCANNERS: IScanner [] = [
    {
      name: "livin-room", 
      address: "24:0A:C4:31:46:B0" ,
      left: 23.5,
      top: 10.6
    },
    {
      name: "garrage", 
      address: "24:0A:C4:32:36:2C",
      left: 3,
      top: 10.6
    }
];