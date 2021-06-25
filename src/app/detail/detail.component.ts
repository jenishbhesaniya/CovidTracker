import { Component, OnInit } from '@angular/core';
import { ShareddataService } from '../shared/shareddata.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  p:any;
  constructor(public data1:ShareddataService) {


  }

  ngOnInit(): void {

  }


}
