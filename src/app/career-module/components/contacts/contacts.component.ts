import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service/contacts-data.service';
import { Router,ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts=new Array()
  currentActiveId:number=1 ;
  constructor(private dataService:ContactsDataService,private router:Router,private activatedRoute:ActivatedRoute) { 
   }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.contacts=this.dataService.get_data();
      this.currentActiveId = params["id"];
  });
  }
  
  updateId(id:any):void{
    this.currentActiveId=id;
    this.router.navigateByUrl("/home/"+id)
  }
}
  
  
 
  
  
    
    
  


