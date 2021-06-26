import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  isLog = false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    if(this.auth.isLogin){
      this.isLog = this.auth.isLogin
    }
  }

}
