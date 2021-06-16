import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { sha256 } from 'js-sha256';
import {  ShareddataService } from '../shared/shareddata.service'
import { Router } from '@angular/router';
import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';

@Component({
  selector: 'app-vaccine-login',
  templateUrl: './vaccine-login.component.html',
  styleUrls: ['./vaccine-login.component.css']
})
export class VaccineLoginComponent implements OnInit {

  otpsent = false;
  formData!:FormGroup;
  otpFetch!:FormGroup;
  token!:string;
  txtnid!:string;
  key!:string;
  constructor(private http:HttpClient,private sOBJ:ShareddataService, private router:Router) {

    }


  ngOnInit(): void {
    this.formData = new FormGroup({
      'mobileNumber': new FormControl(null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    });
    this.otpFetch = new FormGroup({
      'otp': new FormControl(null,[Validators.required,Validators.nullValidator, Validators.pattern("^(0)?[0-9]{6}$")])
    });

  }


  getOtp(){
    const headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '3sjOr2rmM52GzhpMHjDEE1kpQeRxwFDr4YcBEimi'
    })
    const body = {"mobile": this.formData.get('mobileNumber')?.value
  };
    if(this.formData.controls.mobileNumber.valid){
      this.otpsent = true;
    }
    else{
      this.otpsent = false;
    }
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
    // this.token  = sha256(this.otpFetch.controls.otp.value);
    // const body = {
    //   "otp": this.token,
    //   "txnId":this.txtnid
    // };
    // console.log(body);
    // this.http.post<any>('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',body ).subscribe(data => {
    //   console.log(data)
    //   this.key=data['token'];
    //   this.sOBJ.getToke(this.key);
    //   this.router.navigate(['states'])
    // });
    this.key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiI4N2MwNTIzYy1mOWM5LTRlYjYtODA2Zi0yNTVjMTgxOWUxNzQiLCJ1c2VyX3R5cGUiOiJCRU5FRklDSUFSWSIsInVzZXJfaWQiOiI4N2MwNTIzYy1mOWM5LTRlYjYtODA2Zi0yNTVjMTgxOWUxNzQiLCJtb2JpbGVfbnVtYmVyIjo5MjY1ODU0MTA4LCJiZW5lZmljaWFyeV9yZWZlcmVuY2VfaWQiOjM5NzYxMDIyNzkzMzEwLCJ0eG5JZCI6IjY3MGZlNzkxLWI1MTYtNDY1Yy04ODM3LTQ3NzM0ODlhZWRhOSIsImlhdCI6MTYyMzQ3ODUwNiwiZXhwIjoxNjIzNDc5NDA2fQ.j3cB86Rea9daFx2uDHr6p9TAwflPXk99XxSffARhAFc"
    this.sOBJ.getToke(this.key);
    this.router.navigate(['states'])
    //this.getdata();
  }

}

