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

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss']
})
export class ChannelCardComponent implements OnInit, OnChanges {

  @Input() channelItem;
  channelContent: ListItemContent<ChannelItem>;
  // isVideoContentAvailable = false;
  // videoSnippet: VideoDetailedSnippet;
  // videoStatistics: VideoStatistics;
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
      // this.videoContent = res;
      // this.videoSnippet = this.videoContent.items[0].snippet;
      // this.videoStatistics = this.videoContent.items[0].statistics;
      // this.isVideoContentAvailable = true;
    });
  }


}
