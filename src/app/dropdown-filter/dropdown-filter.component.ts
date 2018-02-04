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
    this.logger.log('clickevent', event);

    this.handleOptionSelection(event);

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

  handleOptionSelection(event) {
    this.resetSelectedOptions(event);
    // add selected class to selected option
    event.srcElement.classList.add('selected');
    // show clear icon to selected option
    event.srcElement.parentElement.lastElementChild.classList.add('show-clear');
  }

  resetSelectedOptions(event) {
    // remove previouse selected option
    const selectedOptions = event.toElement.closest('.dropdown-content')
      .querySelectorAll('.dropdown-option');
    Array.prototype.forEach.call(selectedOptions, function (elem) {
      elem.classList.remove('selected');
    });

    // remove previouse clear-icon from selected option
    const selectedOptionsWithClearIcon = event.toElement.closest('.dropdown-content')
      .querySelectorAll('.clear-selected');
    Array.prototype.forEach.call(selectedOptionsWithClearIcon, function (elem) {
      elem.classList.remove('show-clear');
    });
  }

  removeSelected(event, option) {
    this.resetSelectedOptions(event);
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
      if ( this.deviceType === 'mobile') {
        option.visible = !option.mobile ? false : true;
      } else if ( this.deviceType  === 'other') {
        option.visible = !option.other ? false : true;
      }
    });
  }


}
