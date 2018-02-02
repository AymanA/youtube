import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-show-more-items',
  templateUrl: './show-more-items.component.html',
  styleUrls: ['./show-more-items.component.scss']
})
export class ShowMoreItemsComponent implements OnInit, OnChanges {
  @Input() loading = false;
  @Output() load: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loading.currentValue) {
      console.log(changes.loading.currentValue);
    }
  }

  loadMore() {
    this.load.emit();
  }

}
