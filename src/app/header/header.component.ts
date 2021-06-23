import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthService]
})
export class HeaderComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  active=false;
  sticky: boolean = false;
  elementPosition: any;
  @ViewChild('stickyMenu') menuElement!: ElementRef;

  constructor(public aus:AuthService, private _snackBar: MatSnackBar) {

  }
  log(){
    this._snackBar.open('Are you sure?', 'logout').afterDismissed().subscribe(info=>{
      if(info.dismissedByAction==true){
        this.aus.logout();
      }
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
    if(windowScroll >= this.elementPosition){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

}
