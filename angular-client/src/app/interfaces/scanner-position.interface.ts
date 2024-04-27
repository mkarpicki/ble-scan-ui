import { IPosition } from "./position.interface";

export interface IScannerPosition extends IPosition{
    scannerName: string;
    mapId: string;
    signalMultiplier: number;
}