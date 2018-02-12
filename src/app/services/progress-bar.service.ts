import { Injectable } from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

@Injectable()
export class ProgressBarService {
  spinner: BehaviorSubject < boolean > = new BehaviorSubject < boolean > (false);
  progress: BehaviorSubject <number> = new BehaviorSubject <number> (0);
  pendingRequests: BehaviorSubject <number> = new BehaviorSubject <number> (0);

  constructor() { }

}
