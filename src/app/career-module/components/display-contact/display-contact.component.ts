import { Component, OnInit } from '@angular/core';
import {  ContactsDataService } from '../../service/contacts-data.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html',
  styleUrls: ['./display-contact.component.scss']
})
export class DisplayContactComponent implements OnInit{
  contacts: object[] ;
  contact:object;
  current_id:number;
  currentActiveId:number;
  constructor(private dataService:ContactsDataService,private activatedRoute:ActivatedRoute,private router:Router) { 
  }
  
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      this.contacts = this.dataService.get_data()
      this.current_id=params["id"]
      for(let c of this.contacts){
        if(c["id"]==this.current_id){
          this.contact=c;
          break
        }
      }
    })
   }

   edit(){
    this.activatedRoute.params.subscribe(params => {
      this.currentActiveId = params["id"];
  });
  this.router.navigateByUrl("/edit/"+this.currentActiveId)
  }

  delete():void{
    this.activatedRoute.params.subscribe(params => {
      this.currentActiveId = params["id"];
  });
  this.dataService.delete_contact(this.currentActiveId)
  this.contacts=this.dataService.get_data()
  if(this.contacts.length>=1){
    this.currentActiveId=this.contacts[0]["id"]
  }
  if(this.currentActiveId!=undefined){
      this.router.navigateByUrl("/home/"+this.currentActiveId)
  }
  }
}
