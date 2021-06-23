import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active=false;
  sticky: boolean = false;
  constructor() { }

  ngOnInit(): void {

  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.sticky = window.pageYOffset >= 250;
  }

}
