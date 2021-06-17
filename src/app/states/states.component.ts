import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import { ShareddataService} from '../shared/shareddata.service';
import {formatDate} from '@angular/common';
import * as Aos from 'aos';
export interface State {
  state_id:number
  state_name: string;
}
export interface District {
  district_id:number
  district_name: string;
}
export interface Center{
  center_id:number;
  name:string;
  address:string;
  available_capacity:number;
  min_age_limit:number;

  slots:any;
}
@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})

export class StatesComponent implements OnInit {
  stateCtrl = new FormControl();
  disCtrl = new FormControl();
  stName:string = '';
  stNdDst!:FormGroup;
  tiken!:string;
  dstSelect = true;
  filteredStates!: Observable<State[]>;
  filteredDistrict!: Observable<District[]>;
  states: State[] = [{
    'state_id':1,
    'state_name':'Gujarat'
  }] ;
  district:District[] = [];
  center:Center[]=[];
  displayedColumns: string[] = ['center_id', 'name', 'Avaiable'];
  table:boolean=false;
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.token.posToken()
 });

  constructor(private token:ShareddataService,private http:HttpClient) {
    this.getstate();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );



   }

   private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.state_name.toLowerCase().indexOf(filterValue) === 0);

  }
  private _filterDistrict(value: string): District[] {
    const filterValue = value.toLowerCase();
    return this.district.filter(distric => distric.district_name.toLowerCase().indexOf(filterValue) === 0);
  }

    ngOnInit(){
      Aos.init();
      this.stNdDst = new FormGroup(
        {'stnames': new FormControl(),
          'dst': new FormControl()
        });


    }
  getstate(){
    this.http.get<any>('https://cdn-api.co-vin.in/api/v2/admin/location/states',{headers:this.reqHeader}).subscribe((data:any) => {
      this.states=data['states'];

    });
    console.log(this.states);


  }
  getdistrict(a:number){
    this.dstSelect=false;

    this.http.get<any>('https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+a,{headers:this.reqHeader}).subscribe( data => {

      this.district = data['districts']
      console.log(this.district);
    });
    this.filteredDistrict = this.disCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        map(district => district ? this._filterDistrict(district) : this.district.slice())
      );
  }
getdata(a:number){
  let d= new Date();
  console.log(d.getDate() - 1)
  let date=formatDate(new Date(), 'dd/MM/yyyy', 'en');
 console.log(date);
  this.http.get<any>('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+a+'&date='+date).subscribe((data: any)=>{
    this.center=data['sessions'];
    console.log(this.center);
    this.table=true;
    console.log(this.table);
});


}
}
