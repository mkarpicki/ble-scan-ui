import { IChannel } from '../../interfaces/thingspeak/channel.interface';

export class Channel implements IChannel {
    id: number;
    name: string;
    description: string;
    latitude: string;
    longitude: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
    created_at: string;
    updated_at: string;
    last_entry_id: number;    
    
    constructor(iChannel: IChannel) {
        this.id = iChannel.id;
        this.name = iChannel.name;
        this.description = iChannel.description;
        this.latitude = iChannel.latitude;
        this.longitude = iChannel.longitude;
        this.field1 = iChannel.field1;
        this.field2 = iChannel.field2;
        this.field3 = iChannel.field3;
        this.field4 = iChannel.field4;
        this.field5 = iChannel.field5;
        this.field6 = iChannel.field6;
        this.created_at = iChannel.created_at;
        this.updated_at = iChannel.updated_at;
        this.last_entry_id = iChannel.last_entry_id;
    }

    lastEntryId(): number {
        return this.last_entry_id;
    }

    createdAt(): string {
        return this.created_at;
    }

    updatedAt(): string {
        return this.updated_at;
    }
}