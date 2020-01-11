import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ViewerService } from './viewer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  url: SafeResourceUrl;
  constructor(private viewerService: ViewerService, private sanitizer: DomSanitizer, private activeRoute: ActivatedRoute) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('assets/start.html');
  }

  ngOnInit() {
    this.viewerService.url$.subscribe(u =>
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(u)
    );
    this.activeRoute.params.subscribe(params => {
      const mainConnectionId = params.connectionId;
      console.log('ViewerComponent ngOnInit mainConnectionId', mainConnectionId);
      if (mainConnectionId) {
        // sessionStorage.setItem('mainConnectionId', mainConnectionId);
        this.viewerService.viewerPaired(mainConnectionId);
      }
    });
  }
}
