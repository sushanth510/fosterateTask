import { Component, OnInit ,EventEmitter, Output, Input, SimpleChanges,OnChanges} from '@angular/core';
import { ContactsDataService } from '../../service/contacts-data.service';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit,OnChanges {
  contacts=new Array()
  currentActiveId:number=1 ;
  delete_boolean:number;

  
  
  
  constructor(private cds:ContactsDataService,private rt:Router,private ar:ActivatedRoute) { 
   
  
  }

  ngOnInit(): void {

    this.contacts=this.cds.carray;
    this.ar.params.subscribe(params => {
      this.currentActiveId = params["id"];
       

  });
  
  }
  ngOnChanges(changes:SimpleChanges){
       
  }
  updateId(id:any):void{
    this.currentActiveId=id;
    this.rt.navigateByUrl("/home/"+id)
  }
}
  
  
 
  
  
    
    
  


