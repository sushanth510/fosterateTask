import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import {  ContactsDataService, } from '../../service/contacts-data.service';
import {ActivatedRoute} from '@angular/router'



@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html',
  styleUrls: ['./display-contact.component.scss']
})
export class DisplayContactComponent implements OnInit{
  
  contacts: object[] ;
  contact:object;
  current_id:number;
  constructor(private cds:ContactsDataService,private ar:ActivatedRoute) { 
  }
  

  ngOnInit(): void {
  
    this.contact=this.cds.carray[0]
    this.ar.params.subscribe(params => {
      this.contacts = this.cds.carray
      this.current_id=params["id"]
      
      for(let c of this.contacts){
        if(c["c_id"]==this.current_id){
          this.contact=c;
          break
        }
      }
      
    })
   }
}
