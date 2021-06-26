import { Injectable } from '@angular/core';
export interface Center{
  center_id:number;
  name:string;
  address:string;
  available_capacity:number;
  min_age_limit:number;
  vaccine:string;
  available_capacity_dose1:number;
  available_capacity_dose2:number;
  slots:any;
  fee_type:string;
}
@Injectable({
  providedIn: 'root'
})
export class ShareddataService {
  table:boolean=false;
  center:Center[]=[];
  temp:Center[]=[];
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
