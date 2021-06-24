import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Aos from 'aos';
//import { All } from '../shared/data.model';
@Component({
  selector: 'app-alldata',
  templateUrl: './alldata.component.html',
  styleUrls: ['./alldata.component.css']
})
export class AlldataComponent implements OnInit{
  data={
    active:0,
    total_death:0,
    total_cases:0,
    date:Date
  }
  ct:any = 0;
  getdata(){
    return this.http.get('https://api.covid19api.com/summary')

  }
  constructor(private http:HttpClient) { }

  ngOnInit() {
    Aos.init();
    this.getdata().subscribe((data:any )=>{
      console.log(data),
      this.data.total_cases = data.Global.TotalConfirmed,
      // this.ct = setInterval(()=> {
      //   this.data.total_cases++;
      //   if(this.ct ==   data.Global.TotalConfirmed){
      //     clearInterval(this.ct)
      //   }
      // })
      this.data.total_death = data.Global.TotalDeaths,
      this.data.active = data.Global.TotalConfirmed-(data.Global.TotalRecovered+data.Global.TotalDeaths).toString(),
      this.data.date = data.Global.Date
      console.log(this.data);
    });
  }

}
