import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform{
    transform(dateAndTime: string): string {
        return dateAndTime.split('T')[1]?.replace('Z', '') || '';
    }
}