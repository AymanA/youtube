import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  VideoService
} from '../../services/video.service';
import { LoggerService } from '../../services/logger.service';
import { VideoDetailedSnippet } from '../../common/models/video/videoItem/video-detailed-snippet';
import { VideoStatistics } from '../../common/models/video/videoItem/video-statistics';
import { ListItemContent } from '../../common/models/list-item-content';
import { VideoItem } from '../../common/models/video/videoItem/video-item';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit, OnChanges {
  @Input() videoItem;
  videoContent: ListItemContent<VideoItem>;
  isVideoContentAvailable = false;
  videoSnippet: VideoDetailedSnippet;
  videoStatistics: VideoStatistics;
  videoId: string;
  videoDuration;
  constructor(private videoService: VideoService, private logger: LoggerService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.videoItem.currentValue) {
      this.videoId = changes.videoItem.currentValue.id.videoId;
      this.getVideoDetails(this.videoId);
    }
  }

  getVideoDetails(id: string) {
    this.videoService.getVideoDetailsById(id).subscribe(res => {
      this.logger.log('videocardComp', 'getVideoDetails', res);
      this.videoContent = res;
      this.videoSnippet = this.videoContent.items[0] ? this.videoContent.items[0].snippet : {};
      this.videoStatistics = this.videoContent.items[0].statistics;
      this.getVideoDuration(this.videoContent.items[0].contentDetails.duration);
      this.isVideoContentAvailable = true;
    });
  }

  // @TODO handle videos with wrong durations
  getVideoDuration(videoDuration: string) {
    const pattern = /PT((([0-9]+)H)?([0-9]+)M)?(([0-9]+)S)?/;
    const result = pattern.exec(videoDuration);
    let duration = '';
    if (result[3]) {
      duration += result[3] + ':';
    }
    if (result[4]) {
      duration += result[4] + ':';
    }
    if (result[6]) {
      duration += result[6];
    }
    this.videoDuration = duration;
    this.logger.log('VideoCardComponent', 'getVideoDuration', 'videoDuration',
     videoDuration, result, duration);
  }

}
