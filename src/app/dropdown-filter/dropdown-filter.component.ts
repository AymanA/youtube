import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  @Input() dropDownOptions;
  @Input() dropDownTitle;
  @Input() dropDownId;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  deviceType;

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.getDeviceType();
  }

  toggle() {
    document.getElementById(`${this.dropDownId}`).classList.toggle('show');
  }

  onClick(event, selectedOption) {
    this.clicked.emit(selectedOption);
    this.dropDownTitle = selectedOption;
    if (!event.target.matches('.dropbtn')) {

      const dropdowns = document.getElementsByClassName('dropdown-content');
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getDeviceType();

  }

  getDeviceType() {
    if (window.innerWidth < 768) {
      this.deviceType = 'mobile';
    } else if (window.innerWidth >= 768 ) {
      this.deviceType = 'other';
    }
    this.prepareList();
  }

  prepareList() {
    this.dropDownOptions.map(option => {
      this.logger.log('foreachoption', option, this.deviceType);
      if ( this.deviceType === 'mobile') {
        option.visible = !option.mobile ? false : true;
      } else if ( this.deviceType  === 'other') {
        option.visible = !option.other ? false : true;
      }
    });
  }


}
