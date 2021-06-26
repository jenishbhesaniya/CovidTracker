import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {  ShareddataService } from '../shared/shareddata.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit  {
  p:any;
  chipsControl:FormControl=new FormControl();

  option:any=['Age 18+','Age 45+','Dose 1','Dose 2','Free','Paid','Covishield','Covaxin','Sputnik V'];

  constructor(public data1:ShareddataService) {

  }



  ngOnInit(): void {


    this.chipsControl.valueChanges.pipe(untilDestroyed(this)).subscribe(data=>
      {
        this.data1.center=this.data1.temp;
          if(data.length>0){
            for(let i =0;i<data.length;i++){

              switch(data[i]){
                case 'Age 18+':this.data1.center= this.data1.center.filter(center=>center.min_age_limit===18);break;
                case 'Age 45+':this.data1.center= this.data1.center.filter(center=>center.min_age_limit===45);break;
                case 'Free':this.data1.center= this.data1.center.filter(center=>center.fee_type==='Free');break;
                case 'Paid':this.data1.center= this.data1.center.filter(center=>center.fee_type==='Paid');break;
                case 'Dose 1':this.data1.center= this.data1.center.filter(center=>center.available_capacity_dose1>0);break;
                case 'Dose 2':this.data1.center= this.data1.center.filter(center=>center.available_capacity_dose2>0);break;
                case 'Covishield':this.data1.center= this.data1.center.filter(center=>center.vaccine==='COVISHIELD');break;
                case 'Covaxin':this.data1.center= this.data1.center.filter(center=>center.vaccine==='COVAXIN');break;

                default: break;

              }
              console.log(data[i]);
            }

          }
          else{
            this.data1.center=this.data1.temp;
          }

      })

  }



}
// {
//   name:'Age 18+',
//   value:18
// },{name:'Age 45+',value:45},{name:'Dose 1',value:1},{name:'Dose 2',value:2},{name:'Free',value:'Free'},{name:'Paid',value:'Paid'},
// {name:'Covishield',value:'COVISHIELD'},{name:'Covaxin',value:'COVAXIN'},{name:'Sputnik V',value:'Sputnik V'}
