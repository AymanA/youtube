import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { ChannelService } from '../../services/channel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.scss']
})
export class ChannelViewComponent implements OnInit {
  // @TODO make an interface for every type
  channelId: string;
  channelContent: any;
  channelStatistics: any;
  channelSnippet: any;
  isChannelContentAvailable = false;
  channelBrandingSettings: any;
  channelSectionVideos: any[];
  channelSectionPlaylists: any[];
  isChannelPlaylistItemsAvailable = false;
  constructor(private logger: LoggerService, private channelService: ChannelService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
      this.getChannelDetails(this.channelId);
      this.getChannelSectionDate(this.channelId);
    });
  }

  getChannelDetails(id: string) {
    this.channelService.getChannelViewDetailsById(id).subscribe(res => {
      this.logger.log('ChannelViewComponent', 'getChannelDetails', res);
      this.channelContent = res;
      this.channelSnippet = this.channelContent.items[0].snippet;
      this.channelStatistics = this.channelContent.items[0].statistics;
      this.isChannelContentAvailable = true;
      this.channelBrandingSettings = this.channelContent.items[0].brandingSettings;
    });
  }

  getChannelSectionDate(channelId: string) {
    this.channelService.getChannelSectionData(channelId).subscribe(res => {
      this.logger.log('ChannelViewComponent', 'getChannelSectionDate', res);
      this.channelSectionPlaylists = res.items;
      const playlistId = this.channelSectionPlaylists[0].contentDetails.playlists[0];
      this.getPlaylistItems(playlistId);
    });
  }

  getPlaylistItems(playlistId: string) {
    this.logger.log('ChannelViewComponent', 'getPlaylistItems', 'playlistId', playlistId);
    this.channelService.getPlaylistItems(playlistId).subscribe(res => {
      this.logger.log('ChannelViewComponent', 'getPlaylistItems', res);
      this.channelSectionVideos = res.items;
      this.isChannelPlaylistItemsAvailable = true;
      // this.channelContent = res;
      // this.channelSnippet = this.channelContent.items[0].snippet;
      // this.channelStatistics = this.channelContent.items[0].statistics;
      // this.isChannelContentAvailable = true;
      // this.channelBrandingSettings = this.channelContent.items[0].brandingSettings;
    });
  }
}
