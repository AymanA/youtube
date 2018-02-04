import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { SearchService } from '../services/search.service';
import { FilterObject } from '../common/models/custom-models/filter-object';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  @Input() dropDownOptions;
  @Input() dropDownTitle;
  @Input() dropDownId;
  @Input() queryParamName;
  @Input () defaultValue;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  deviceType;
  filterParamsObjects: FilterObject[];


  constructor(private logger: LoggerService, private searchService: SearchService) { }

  ngOnInit() {
    this.getDeviceType();
    this.searchService.filterParameters.subscribe( filters => this.filterParamsObjects = filters);
  }

  toggle() {
    document.getElementById(`${this.dropDownId}`).classList.toggle('show');
  }

  onClick(event, selectedOption) {
    this.clicked.emit();
    const filterObject: FilterObject = {queryParamName: this.queryParamName,
       filterValue: selectedOption.value};

    this.filterParamsObjects.push(filterObject);
    this.searchService.filterParameters.next(this.filterParamsObjects);

    this.dropDownTitle = selectedOption;

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
    this.filterParamsObjects = this.filterParamsObjects.filter(element => {
      return element.filterValue !== option.value;
    });
    this.searchService.filterParameters.next(this.filterParamsObjects);
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
