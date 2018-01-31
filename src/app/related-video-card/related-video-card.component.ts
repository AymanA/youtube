import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { VideoStatistics } from '../common/models/video/videoItem/video-statistics';
import { LoggerService } from '../services/logger.service';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-related-video-card',
  templateUrl: './related-video-card.component.html',
  styleUrls: ['./related-video-card.component.scss']
})
export class RelatedVideoCardComponent implements OnInit {
  @Input() videoItem: any;
  @Input() videoId: string;
  videoStatistics: VideoStatistics;

  isVideoStatisticsAvailable = false;
  constructor(private logger: LoggerService, private videoService: VideoService) {}

  ngOnInit() {
    // this.videoId = this.videoItem.contentDetails.videoId;
    this.getVideoStatistics(this.videoId);
  }

  getVideoStatistics(videoId: string) {
    this.videoService.getVideoStatistics(videoId).subscribe(res => {
      this.videoStatistics = res.items[0].statistics;
      this.isVideoStatisticsAvailable = true;
      this.logger.log('RelatedVideoCardComponent', 'getVideoStatistics', res);
    });

  }

}
