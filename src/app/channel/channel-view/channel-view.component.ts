import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { ChannelService } from '../../services/channel.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

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
  channelPlaylists: any[];
  isChannelPlaylistsAvailable = false;
  isChannelPlaylistItemsAvailable = false;
  constructor(private logger: LoggerService, private channelService: ChannelService,
    private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    // @TODO check is channel subscribed or not (unauthrized api issue)
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
      this.getChannelDetails(this.channelId);
      // this.getChannelSectionData(this.channelId);
      this.getChannelPlaylists(this.channelId);
    });
  }

  getChannelDetails(id: string) {
    this.channelService.getChannelViewDetailsById(id).subscribe(data => {
      this.logger.log('ChannelViewComponent', 'getChannelDetails', data);
      this.channelContent = data;
      this.channelSnippet = this.channelContent.items[0].snippet;
      this.dataService.channelTitle.next(data.items[0].snippet.title);
      this.channelStatistics = this.channelContent.items[0].statistics;
      this.isChannelContentAvailable = true;
      this.channelBrandingSettings = this.channelContent.items[0].brandingSettings;
    });
  }

  getChannelSectionData(channelId: string) {
    this.channelService.getChannelSectionData(channelId).subscribe(data => {
      this.logger.log('ChannelViewComponent', 'getChannelSectionData', data);
      this.channelSectionPlaylists = data.items;
      const playlistId = this.channelSectionPlaylists[0].contentDetails.playlists[0];
      this.getPlaylistItems(playlistId);
    });
  }

  getChannelPlaylists(channelId: string) {
    this.channelService.getChannelPlaylists(channelId).subscribe( data => {
      this.logger.log('ChannelViewComponent', 'getChannelplaylists', data);
      this.channelPlaylists = data.items;
      this.isChannelPlaylistsAvailable = true;
    });
  }

  getPlaylistItems(playlistId: string) {
    this.logger.log('ChannelViewComponent', 'getPlaylistItems', 'playlistId', playlistId);
    this.channelService.getPlaylistItems(playlistId).subscribe(data => {
      this.logger.log('ChannelViewComponent', 'getPlaylistItems', data);
      this.channelSectionVideos = data.items;
      this.isChannelPlaylistItemsAvailable = true;
      // this.channelContent = data;
      // this.channelSnippet = this.channelContent.items[0].snippet;
      // this.channelStatistics = this.channelContent.items[0].statistics;
      // this.isChannelContentAvailable = true;
      // this.channelBrandingSettings = this.channelContent.items[0].brandingSettings;
    });
  }
}
