import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import { ContactsDataService } from 'src/app/career-module/service/contacts-data.service';


@Component({
  selector: 'app-details-modification',
  templateUrl: './details-modification.component.html',
  styleUrls: ['./details-modification.component.scss']
})
export class DetailsModificationComponent implements OnInit {
  delete_boolean=0;
  currentActiveId:number;
  contacts=new Array()

  constructor(private rt:Router,private ar:ActivatedRoute,private cds:ContactsDataService) { }


  

  ngOnInit(): void {
  }
  edit(){
    this.ar.params.subscribe(params => {
      this.currentActiveId = params["id"];
      

  });
  this.rt.navigateByUrl("/edit/"+this.currentActiveId)
  }
  delete():void{
    this.delete_boolean+=1;
    this.ar.params.subscribe(params => {
      this.currentActiveId = params["id"];
  });
  this.cds.delete_contact(this.currentActiveId)

    
  this.contacts=this.cds.carray
  if(this.contacts.length>=1){
    this.currentActiveId=this.contacts[0]["c_id"]
  }
  if(this.currentActiveId!=undefined){
      this.rt.navigateByUrl("/home/"+this.currentActiveId)
  }
  }
  
}
