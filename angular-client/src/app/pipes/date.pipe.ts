import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform{
    transform(dateAndTime: string): string {
        return dateAndTime.split('T')[0] || '';
    }
}