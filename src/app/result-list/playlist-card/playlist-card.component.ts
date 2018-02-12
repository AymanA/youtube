import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit, OnChanges {
  @Input() playlistItem;
  @Input() playlistId;
  isplaylistContentAvailable = false;
  playlistItemsCount;
  playlistSnippet;
  videoId;
  constructor(private playlistService: PlaylistService, private logger: LoggerService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const playlistCurrentValue = changes.playlistItem.currentValue;
    if (playlistCurrentValue) {
      this.playlistSnippet = playlistCurrentValue.snippet;
      if (playlistCurrentValue.contentDetails) {
        this.playlistItemsCount = playlistCurrentValue.contentDetails.itemCount;
        this.isplaylistContentAvailable = true;
      } else {
        this.getPlaylistContentDetails(this.playlistId);
      }
      this.getPlaylistVideoId(this.playlistId);
    }
  }

  getPlaylistContentDetails(playlistId: string) {
    this.logger.log('PlaylistCardComponent', 'getPlaylistDetails', 'playlistid', playlistId);
    this.playlistService.getPlaylistItemsCountById(playlistId).subscribe( (data: any) => {
      this.logger.log('PlaylistCardComponent', 'getPlaylistDetails', data);
      this.playlistItemsCount = data.items[0].contentDetails.itemCount;
      this.isplaylistContentAvailable = true;
    });
  }
  getPlaylistVideoId(playlistId: string) {
    this.playlistService.getPlaylistItemsById(playlistId).subscribe( (data: any) => {
      this.logger.log('PlaylistCardComponent', 'getPlaylistfullDetails', data);
      this.videoId = data.items[0].contentDetails.videoId;
    });
  }
}
