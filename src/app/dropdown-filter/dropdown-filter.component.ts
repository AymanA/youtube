import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import {
  LoggerService
} from '../services/logger.service';
import {
  SearchDataService
} from '../services/search-data.service';
import {
  FilterObject
} from '../common/models/custom-models/filter-object';
import { DateFormatPipe } from 'angular2-moment';
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
  @Input() defaultValue;
  @Output() clicked: EventEmitter < any > = new EventEmitter < any > ();
  deviceType;
  filterParamsObjects: FilterObject[];


  constructor(private logger: LoggerService, private searchDataService: SearchDataService) {}

  ngOnInit() {
    this.getDeviceType();
    this.searchDataService.filterParameters.subscribe(filters => this.filterParamsObjects = filters);
  }

  toggle() {
    document.getElementById(`${this.dropDownId}`).classList.toggle('show');
  }

  onClick(event, selectedOption) {
    this.clicked.emit();
    const filterObject: FilterObject = {queryParamName: this.queryParamName, filterValue: ''};
    if (this.queryParamName === 'publishedAfter') {
      filterObject.filterValue =  this.getRFCTimeFormat(selectedOption.value);
    } else {
      filterObject.filterValue = selectedOption.value;
    }

    this.updateFilterObject(filterObject);

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

  updateFilterObject(filterObject: FilterObject) {
    const indexOfObject = this.filterParamsObjects.
    findIndex(item => item.queryParamName === filterObject.queryParamName);
    console.log('indexofobject', indexOfObject);
    if (indexOfObject === -1 ) {
      this.filterParamsObjects.push(filterObject);
    } else {
      this.filterParamsObjects[indexOfObject] = filterObject;
    }
    this.searchDataService.filterParameters.next(this.filterParamsObjects);
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
    this.clicked.emit();
    this.resetSelectedOptions(event);
    this.filterParamsObjects = this.filterParamsObjects.filter(element => {
      return element.filterValue !== option.value;
    });
    this.searchDataService.filterParameters.next(this.filterParamsObjects);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getDeviceType();
  }

  getDeviceType() {
    if (window.innerWidth < 768) {
      this.deviceType = 'mobile';
    } else if (window.innerWidth >= 768) {
      this.deviceType = 'other';
    }
    this.prepareList();
  }

  prepareList() {
    this.dropDownOptions.map(option => {
      if (this.deviceType === 'mobile') {
        option.visible = !option.mobile ? false : true;
      } else if (this.deviceType === 'other') {
        option.visible = !option.other ? false : true;
      }
    });
  }

  getRFCTimeFormat(selectedDateFilter: string) {
    const date = new Date();
    let rfcTime = '';

    switch (selectedDateFilter) {
      case 'hour':
        const hourago = new Date(date.getTime() - (1000 * 60 * 60));
        rfcTime = hourago.toISOString();
        break;
      case 'today':
        const today = new Date(`${(new DateFormatPipe()).transform(date, 'YYYY-MM-DD')}`);
        rfcTime = today.toISOString();
        break;
      case 'week':
        date.setTime(date.getTime() - (7 * 24 * 60 * 60 * 1000));
        rfcTime = date.toISOString();
        break;
      case 'month':
        date.setTime(date.getTime() - (30 * 24 * 60 * 60 * 1000));
        rfcTime = date.toISOString();
        break;

      default:
        break;
    }
    return rfcTime;
  }

}
