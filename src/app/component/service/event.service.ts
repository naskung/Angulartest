import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _isTabOneFilled = new BehaviorSubject<boolean>(false);

  get isTabOneFilled() {
    return this._isTabOneFilled.asObservable();
  }

  setTabOneFilled(status: boolean) {
    this._isTabOneFilled.next(status);
  }
}
