import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  VideoService
} from '../../../result-list/video-card/video.service';
import {
  LoggerService
} from '../../../services/logger.service';
import {
  VideoStatistics
} from '../../../common/models/video/videoItem/video-statistics';

@Component({
  selector: 'app-channel-video-card',
  templateUrl: './channel-video-card.component.html',
  styleUrls: ['./channel-video-card.component.scss']
})
export class ChannelVideoCardComponent implements OnInit {
  @Input() videoItem: any;
  videoStatistics: VideoStatistics;
  videoId: string;
  isVideoStatisticsAvailable = false;
  constructor(private logger: LoggerService, private videoService: VideoService) {}

  ngOnInit() {
    this.videoId = this.videoItem.contentDetails.videoId;
    this.getVideoStatistics(this.videoId);
  }

  getVideoStatistics(videoId: string) {
    this.videoService.getVideoStatistics(videoId).subscribe(res => {
      this.videoStatistics = res.items[0].statistics;
      this.isVideoStatisticsAvailable = true;
      this.logger.log('ChannelVideoCardComponent', 'getVideoStatistics', res);
    });

  }

}
