import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {  ShareddataService } from '../shared/shareddata.service'
import { Router } from '@angular/router';
import { User } from '../auth/user.model';
import { Subject } from 'rxjs';
@Injectable({providedIn:'root'})
export class AuthService {
  user = new Subject<User>();
  otpsent = false;
  key!:string;
  token!:string;
  txtnid!:string;
  isLogin = false;
  constructor(private http:HttpClient,private sOBJ:ShareddataService,private router:Router) { }

  verifyUser(body:any){
    this.http.post<any>('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',body ).subscribe(data => {
      this.key=data['token'];
      this.sOBJ.getToke(this.key);
      const user = new User(this.key);
      this.user.next(user);
      console.log("above next router")
      this.router.navigate(['/states']);
      localStorage.setItem('setsession',this.key)

    })
  }
  gettoken(){
    return !!localStorage.getItem('setsession')
  }
  logout(){
    localStorage.removeItem('setsession');
    this.router.navigate(['']);
  }
}
