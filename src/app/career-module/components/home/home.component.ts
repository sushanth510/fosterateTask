import { Component, OnInit } from '@angular/core';

import { ContactsDataService } from '../../service/contacts-data.service';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  delete_boolean:any;
  contacts:object[]
  href:any;

  constructor(private cds:ContactsDataService,private rt:Router) { }

  ngOnInit(): void {

    this.contacts=this.cds.carray;
    this.href=this.rt.url
    console.log(this.href,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if(this.href=="/home" && this.contacts.length>0)
      this.rt.navigate(["/home",this.contacts[0]["c_id"]])
  }
  

}
