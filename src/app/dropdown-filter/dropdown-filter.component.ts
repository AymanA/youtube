import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.getDeviceType();
    this.prepareList();
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
    this.prepareList();
  }

  getDeviceType() {
    if (window.innerWidth < 768) {
      this.deviceType = 'mobile';
    } else {
      this.deviceType = 'other';
    }
  }

  prepareList() {
    this.dropDownOptions.map(type => {
      if ( this.deviceType === 'mobile' && !type.mobile) {
        type.visible = false;
      }
    });
  }


}
