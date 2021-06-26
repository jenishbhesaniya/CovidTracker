import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import { ShareddataService} from '../shared/shareddata.service';
import {formatDate} from '@angular/common';
import * as Aos from 'aos';
import { MatPaginator } from '@angular/material/paginator';
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

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})

export class StatesComponent implements OnInit {
  stateCtrl = new FormControl();
  disCtrl = new FormControl();
  date:Array<Date>=[new Date()];
  formpin!:FormGroup;
  listlength!:number;
  stName:string = '';
  stNdDst!:FormGroup;
  tiken!:string;
  showProgress = false
  today:Date=new Date;
  dist_id?:number
  dstSelect = true;
  posdate:Date=new Date();
  filteredStates!: Observable<State[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('options', { read: ElementRef }) public options!: ElementRef<any>;
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


  displayedColumns: string[] = ['center_id', 'name', 'Avaiable'];

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.token.posToken()
 });

  constructor(private token:ShareddataService,private http:HttpClient ) {
    this.getstate();
    this.getDate();
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
          'disCtrl': new FormControl()
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
      distinctUntilChanged(),
      map(district => district ? this._filterDistrict(district) : this.district.slice())
    );


  }
getdata(date:Date,a?:number){
  this.showProgress = true
  let d= formatDate(date,'dd/MM/yyy', 'en-in');
  this.dist_id = a;
  this.http.get<any>('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+this.dist_id+'&date='+d).subscribe((data: any)=>{
    this.token.center=data['sessions'];
    this.token.temp=data['sessions'];
    this.token.table=true;
     this.listlength=data['sessions'].length;
     this.showProgress = false;
});


}
getpin(date:Date){
  this.showProgress = true;

  let d= formatDate(date,'dd/MM/yyy', 'en-in');
  let pin = this.formpin.get('code')?.value;
  console.log(d,pin);
  this.http.get<any>('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pin+'&date='+d).subscribe(data=>{
  this.token.center=data['sessions'];
  this.token.temp=data['sessions'];
  this.token.table=true;
  this.listlength=data['sessions'].length;
  this.showProgress = false

  })
}
getDate(){
  console.log("getting date");
  let b = new Date(this.posdate);
  for(let i =0;i<5;i++){
    b.setDate(b.getDate()+1);
    this.date.push(new Date(b));
  }
  this.posdate=b;
}
changetab(){
  this.token.table=false;
}
public scrollRight(): void {
  this.options.nativeElement.scrollTo({ left: (this.options.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  this.getDate();
}

public scrollLeft(): void {
  this.options.nativeElement.scrollTo({ left: (this.options.nativeElement.scrollLeft - 150), behavior: 'smooth' });
}

}


