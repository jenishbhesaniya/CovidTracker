import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { All } from '../shared/data.model';
@Component({
  selector: 'app-alldata',
  templateUrl: './alldata.component.html',
  styleUrls: ['./alldata.component.css']
})
export class AlldataComponent implements OnInit{
  data={
    active:1,
    total_death:'',
    total_cases:'',
    date:Date
  }
  getdata(){
    return this.http.get('https://api.covid19api.com/summary');

  }
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getdata().subscribe((data:any )=>{
      console.log(data),
      this.data.total_cases = data.Global.TotalConfirmed,
      this.data.total_death = data.Global.TotalDeaths,
      this.data.active = data.Global.TotalConfirmed-(data.Global.TotalRecovered+data.Global.TotalDeaths).toString(),
      this.data.date = data.Global.Date
      console.log(this.data);
    });
  }

}
