export interface IChannel {
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

    lastEntryId(): number;
    createdAt(): string;
    updatedAt(): string;

}