import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import { ShareddataService} from '../shared/shareddata.service';
import {formatDate} from '@angular/common';
import * as Aos from 'aos';
export interface State {
  state_id:number
  state_name: string;
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: any;
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
  vaccine:string;
  available_capacity_dose1:number;
  available_capacity_dose2:number;
  slots:any;
  fee_type:string;
}
@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})

export class StatesComponent implements OnInit {
  stateCtrl = new FormControl();
  disCtrl = new FormControl();
  formpin!:FormGroup;
  listlength!:number;
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
  tiles: Tile[] = [
    {text: 'Helpline', cols: 4, rows: 1, color: 'whitesmokey'},
    {text: '91 11 23 978046', cols: 2, rows: 1, color: 'rgba(0, 32, 59, 23)'
  },
    {text: '1075', cols: 2, rows: 1, color: 'rgba(0, 32, 59, 23)'},
  ];
  district:District[] = [];
  center:Center[]=[];
  displayedColumns: string[] = ['center_id', 'name', 'Avaiable'];
  table:boolean=false;
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.token.posToken()
 });

  constructor(private token:ShareddataService,private http:HttpClient ) {
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
      this.formpin = new FormGroup({
        'code' : new FormControl(null,[Validators.required,Validators.nullValidator, Validators.pattern("^(0)?[0-9]{6}$")])
      })




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
    });
    this.filteredDistrict = this.disCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        map(district => district ? this._filterDistrict(district) : this.district.slice())
      );
  }
getdata(a:number){
  let d= formatDate(new Date(),'dd/MM/yyy', 'en-in');
  console.log(d)
  this.http.get<any>('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+a+'&date='+d).subscribe((data: any)=>{
    this.center=data['sessions'];
    console.log(this.center);
    this.table=true;
     this.listlength=data['sessions'].length;
});


}
getpin(){
  let d= formatDate(new Date(),'dd/MM/yyy', 'en-in');
  let pin = this.formpin.get('code')?.value;
  console.log(d,pin);
  this.http.get<any>('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pin+'&date='+d).subscribe(data=>{
  this.center=data['sessions'];
  this.table=true;
  this.listlength=data['sessions'].length;
  })
}
}
