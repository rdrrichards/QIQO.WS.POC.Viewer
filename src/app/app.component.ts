import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'qiqo-ws-poc-viewer';
  constructor(private commsService: CommunicationService) {}
  ngOnInit() {
    setTimeout(() => {
      this.commsService.join();
    }, 2000);
  }
}
