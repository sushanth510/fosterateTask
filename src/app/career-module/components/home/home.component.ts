import { Component, OnInit } from '@angular/core';

import { ContactsDataService } from '../../service/contacts-data.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contacts:object[];
  href:string;
  currentId:number=1;
  existed_contact:boolean;
  contact_counter:number;

  constructor(private cds:ContactsDataService,private rt:Router,private ar :ActivatedRoute) { }

  ngOnInit(): void {

    this.contacts=this.cds.carray;
    this.href=this.rt.url;
    this.ar.params.subscribe(params=>{
      this.currentId=params.id
      this.contact_counter=0
      for(let contact of this.contacts){
        console.log(contact["c_id"])
        if(this.currentId!=contact["c_id"]){
            this.contact_counter+=1
        }
        else{
          this.existed_contact=true
          console.log("contact existed")
          break
        }
      }
      console.log(this.contact_counter)
      if(this.contact_counter==this.contacts.length){
        this.existed_contact=false;
        console.log("no contact")
      }
      console.log("-----",this.existed_contact)
    })
    
    if(this.href=="/home" && this.contacts.length>0)
      this.rt.navigate(["/home",this.contacts[0]["c_id"]]);
    
  }
  

}
