import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ShareddataService} from '../shared/shareddata.service'
export interface State {
  state_id:number
  state_name: string;
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
  stName:string = '';
  stNdDst!:FormGroup;
  tiken!:string;
  dstSelect = true;
  filteredStates!: Observable<State[]>;
  filteredDistrict!: Observable<District[]>;
  states: State[] = [] ;
  district:District[] = [];
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.token.posToken()
 });

  constructor(private token:ShareddataService,private http:HttpClient) {
    this.getstate();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
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
      this.stNdDst = new FormGroup(
        {'stnames': new FormControl(),
          'dst': new FormControl()
        });


    }
  getstate(){
    this.http.get<any>('https://cdn-api.co-vin.in/api/v2/admin/location/states',{headers:this.reqHeader}).subscribe((data:any) => {
      this.states=data['states'];
      console.log(this.states);

    });


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
        map(district => district ? this._filterDistrict(district) : this.district.slice())
      );
  }
getdata(a:string){
  console.log(a);
}


}
