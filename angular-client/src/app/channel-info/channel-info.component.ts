import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Channel } from '../interfaces/thingspeak/channel.interface';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss']
})
export class ChannelInfoComponent implements OnChanges{

  @Input() channel?: Channel;

  ngOnChanges(changes: SimpleChanges) {
    this.channel = changes['channel'].currentValue; 
  }

}
