import { IFeed } from '../../interfaces/thingspeak/feed.interface';

export class Feed implements IFeed {

    created_at: string;
    entry_id: number;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;

    constructor(iFeed: IFeed) {
        this.created_at = iFeed.created_at;
        this.entry_id = iFeed.entry_id;
        this.field1 = iFeed.field1;
        this.field2 = iFeed.field2;
        this.field3 = iFeed.field3;
        this.field4 = iFeed.field4;
        this.field5 = iFeed.field5;
        this.field6 = iFeed.field6;
    }

    entryId(): number {
        return this.entry_id;
    }

    scannerMacAddress(): string {
        return this.field1;
    }
    
    beaconMacAddress(): string {
        return this.field2;
    }
    
    rssi(): string {
        return this.field3;
    }
    
    name(): string {
        return this.field4;
    }

    beaconTxPower(): string {
        return this.field5;
    }

    timestamp(): string {
        return this.field6;
    }


    createdDate(): string {
        return this.created_at.split('T')[0];
    }

    createdTime(): string {
        return this.created_at.split('T')[1].replace('Z', '');
    }
}
