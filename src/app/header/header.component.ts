import { Component, ElementRef, HostListener, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthService]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  active=false;
  sticky: boolean = false;
  elementPosition: any;
  @ViewChild('stickyMenu') menuElement!: ElementRef;

  constructor(public aus:AuthService, private _snackBar: MatSnackBar) {

  }
  log(){
    this._snackBar.open('Are you sure?', 'logout',{duration: 3000}).onAction().subscribe(() =>{
     this.aus.logout();
    })

    // this.aus.logout();

  }
  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    if(windowScroll >= 250){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

}
