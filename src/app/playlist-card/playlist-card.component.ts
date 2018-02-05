import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit, OnChanges {
  @Input() playlistItem;
  playlistId;
  isplaylistContentAvailable = false;
  playlistItemsCount;
  playlistSnippet;
  constructor(private playlistService: PlaylistService, private logger: LoggerService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.playlistItem.currentValue) {
      this.playlistId = changes.playlistItem.currentValue.id.playlistId;
      this.playlistSnippet = changes.playlistItem.currentValue.snippet;
      this.getPlaylistContentDetails(this.playlistId);
    }
  }

  getPlaylistContentDetails(playlistId: string) {
    this.logger.log('PlaylistCardComponent', 'getPlaylistDetails', 'playlistid', playlistId);
    this.playlistService.getPlaylistItemsCountById(playlistId).subscribe( data => {
      this.logger.log('PlaylistCardComponent', 'getPlaylistDetails', data);
      this.playlistItemsCount = data.items[0].contentDetails.itemCount;
      this.isplaylistContentAvailable = true;
    });
  }
}
