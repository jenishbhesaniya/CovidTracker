import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {


  private token!:string
  constructor() { }

  getToke(key:string){
    this.token = key;
    console.log("token succefully got!"+ this.token);
  }
  posToken(){
    return this.token;
  }

}
