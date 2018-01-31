import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../services/logger.service';
import { VideoService } from '../../services/video.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {
  videoId: string;
  videoDetails: any;
  isVideoDetailsAvailable = false;
  isRelatedVideosAvailable = false;
  relatedVideos: any[];
  constructor(private logger: LoggerService, private videoService: VideoService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.videoId = params['id'];
      this.getVideoDetails(this.videoId);
      this.getRelatedVideos(this.videoId);
    });
  }
  getVideoDetails(videoId: string) {
    this.videoService.getVideoViewDetailsById(videoId).subscribe(res => {
      this.logger.log('VideoViewComponent', 'getVideoDetails', res);
      this.videoDetails = res.items[0];
      this.isVideoDetailsAvailable = true;
      // this.channelSnippet = this.channelContent.items[0].snippet;
      // this.channelStatistics = this.channelContent.items[0].statistics;
      // this.isChannelContentAvailable = true;
      // this.channelBrandingSettings = this.channelContent.items[0].brandingSettings;
    });
  }

  getVideoFrame(embedHtml: string) {
    return this.sanitizer.bypassSecurityTrustHtml(embedHtml);
  }

  getRelatedVideos(videoId: string) {
    this.videoService.getRelatedVideos(videoId).subscribe(res => {
      this.logger.log('VideoViewComponent', 'getRelatedVideos', res);
      this.relatedVideos = res.items;
      this.isRelatedVideosAvailable = true;
    });
  }
}
