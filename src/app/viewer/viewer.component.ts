import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ViewerService } from './viewer.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  url: SafeResourceUrl;
  constructor(private viewerService: ViewerService, private sanitizer: DomSanitizer) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('assets/start.html');
  }

  ngOnInit() {
    this.viewerService.url$.subscribe(u =>
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(u)
    );
  }
}
