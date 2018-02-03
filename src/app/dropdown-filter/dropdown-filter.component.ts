import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  @Input() dropDownOptions;
  @Input() dropDownTitle;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    document.getElementById('dropdown-list').classList.toggle('show');
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


}
