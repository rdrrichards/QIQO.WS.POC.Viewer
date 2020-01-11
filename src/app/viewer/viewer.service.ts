import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  private url: Subject<string> = new Subject();
  url$ = this.url.asObservable();
  private onConnect: Subject<string> = new Subject();
  onConnect$ = this.onConnect.asObservable();
  constructor() { }
  openImages(uri: string) {
    this.url.next(uri);
  }
  connected(connectionId: string) {
    console.log('ViewerService connected connectionId:', connectionId);
    // this.onConnect.next(connectionId);
    sessionStorage.setItem('viewerConnectionId', connectionId);
  }
  viewerPaired(connectionId: string) {
    console.log('ViewerService viewerPaired to connectionId:', connectionId);
    this.onConnect.next(connectionId);
    sessionStorage.setItem('mainConnectionId', connectionId);
  }
}
