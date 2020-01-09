import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  private url: Subject<string> = new Subject();
  url$ = this.url.asObservable();
  constructor() { }
  openImages(uri: string) {
    this.url.next(uri);
  }
}
