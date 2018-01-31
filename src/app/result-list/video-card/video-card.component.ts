import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  VideoService
} from './video.service';
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
  constructor(private videoService: VideoService, private logger: LoggerService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.videoItem.currentValue) {
      this.getVideoDetails(changes.videoItem.currentValue.id.videoId);
    }

  }
  getVideoDetails(id: string) {
    this.videoService.getVideoDetailsById(id).subscribe(res => {
      // this.logger.log('videocardComp', 'getVideoDetails', res);
      this.videoContent = res;
      this.videoSnippet = this.videoContent.items[0].snippet;
      this.videoStatistics = this.videoContent.items[0].statistics;
      this.isVideoContentAvailable = true;
    });
  }

}
