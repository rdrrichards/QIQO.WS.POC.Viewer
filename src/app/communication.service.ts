import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ViewerService } from './viewer/viewer.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  hubConnection: signalR.HubConnection;
  constructor(private viewerService: ViewerService) {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Error)
      .withUrl(`${environment.baseHubUrl}comms`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.start()
      .then(_ => this.viewerService.connected(this.hubConnection.connectionId))
      .catch(err => console.log(err));
    // this.hubConnection.connectionId;
    // this.hubConnection.
    this.hubConnection.on('view', (uri: string) => {
      console.log('view', uri);
      this.viewerService.openImages(uri);
    });
    this.hubConnection.on('joined', (userName: string) => {
      console.log(`${userName} joined the group`, userName);
    });
    this.hubConnection.on('joinedviewer', (userName: string) => {
      console.log(`${userName} joinedviewer the group`);
      console.log('this.hubConnection.connectionId: ', this.hubConnection.connectionId);
    });
    this.viewerService.onConnect$.subscribe(mainConnectionId => {
      console.log(`invoking joinviewer to group: `, mainConnectionId);
      this.hubConnection.invoke('joinviewer', 'rrichards (viewer)', mainConnectionId);
    });
  }
  join() {
    // this.hubConnection.invoke('join', 'rrichards (viewer)');
  }
}
