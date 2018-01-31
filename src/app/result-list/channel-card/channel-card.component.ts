import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  ChannelService
} from './channel.service';
import { LoggerService } from '../../services/logger.service';
import { ListItemContent } from '../../common/models/list-item-content';
import { ChannelItem } from '../../common/models/channel/channel-item';
import { ChannelStatistics } from '../../common/models/channel/channel-statistics';
import { ChannelDetailedSnippet } from '../../common/models/channel/channel-detailed-snippet';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss']
})
export class ChannelCardComponent implements OnInit, OnChanges {

  @Input() channelItem;
  channelContent: ListItemContent<ChannelItem>;
  isChannelContentAvailable = false;
  channelSnippet: ChannelDetailedSnippet;
  channelStatistics: ChannelStatistics;
  constructor(private channelService: ChannelService, private logger: LoggerService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.channelItem.currentValue) {
      this.getChannelDetails(changes.channelItem.currentValue.id.channelId);
    }

  }
  getChannelDetails(id: string) {
    this.channelService.getChannelDetailsById(id).subscribe(res => {
      this.logger.log('channelcardComp', 'getChannelDetails', res);
      this.channelContent = res;
      this.channelSnippet = this.channelContent.items[0].snippet;
      this.channelStatistics = this.channelContent.items[0].statistics;
      this.isChannelContentAvailable = true;
    });
  }


}
