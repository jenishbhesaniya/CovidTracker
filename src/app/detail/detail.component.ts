import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Center, ShareddataService } from '../shared/shareddata.service';
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
        const temp:Center[]=this.data1.center;

          this.data1.center= this.data1.center.filter(center=>center.min_age_limit===18);
        console.log(data);
      })

  }



}
// {
//   name:'Age 18+',
//   value:18
// },{name:'Age 45+',value:45},{name:'Dose 1',value:1},{name:'Dose 2',value:2},{name:'Free',value:'Free'},{name:'Paid',value:'Paid'},
// {name:'Covishield',value:'COVISHIELD'},{name:'Covaxin',value:'COVAXIN'},{name:'Sputnik V',value:'Sputnik V'}
