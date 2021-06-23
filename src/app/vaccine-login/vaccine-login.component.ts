import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { sha256 } from 'js-sha256';
import {  ShareddataService } from '../shared/shareddata.service'
import { Router } from '@angular/router';
import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';
import { User } from '../auth/user.model';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-vaccine-login',
  templateUrl: './vaccine-login.component.html',
  styleUrls: ['./vaccine-login.component.css']
})

export class VaccineLoginComponent implements OnInit {
  user = new Subject<User>();
  otpsent = false;
  formData!:FormGroup;
  otpFetch!:FormGroup;
  token!:string;
  txtnid!:string;
  key!:string;
  constructor(private http:HttpClient,private sOBJ:ShareddataService, private router:Router,private aus:AuthService) {

    }


  ngOnInit(): void {
    this.formData = new FormGroup({
      'mobileNumber': new FormControl(null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    });
    this.otpFetch = new FormGroup({
      'otp': new FormControl(null,[Validators.required,Validators.nullValidator, Validators.pattern("^(0)?[0-9]{6}$")])
    });
    if(this.formData.controls.mobileNumber.valid){
      this.otpsent = true;
    }
    else{
      this.otpsent = false;
    }
  }


  getOtp(){
    const headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '3sjOr2rmM52GzhpMHjDEE1kpQeRxwFDr4YcBEimi'
    })
    const body = {"mobile": this.formData.get('mobileNumber')?.value
    };

     this.http.post<any>('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',body ).subscribe(data => {
      this.otpsent = true,
      this.txtnid = data['txnId']
    });

  }
  resend(){
    this.otpsent = false;
    this.formData.reset();
  }
  verify(){
    this.token  = sha256(this.otpFetch.controls.otp.value);
    const body = {
      "otp": this.token,
      "txnId":this.txtnid
    };
    this.aus.verifyUser(body);
    // this.http.post<any>('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',body ).subscribe(data => {
    //   console.log(data)
    //   this.key=data['token'];
    //   this.sOBJ.getToke(this.key);
    //   this.router.navigate(['states']);
    //   const expirationDate  = new Date(new Date().getTime());
    //   const user = new User(this.key)
    //   this.user.next(user)
    //   this.sOBJ.getToke(this.key);
    //   this.router.navigate(['states'])
    // });


    //this.getdata();
  }

}

