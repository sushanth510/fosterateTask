import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service/contacts-data.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contacts:object[];
  currentLink:string;
  currentId:number;
  existedContact:boolean;
  contactCounter:number;
  index:number;
  constructor(private dataservice:ContactsDataService,private router:Router,private activatedRoute :ActivatedRoute) { }
  ngOnInit(): void {
    this.currentLink=this.router.url;
    this.activatedRoute.params.subscribe(params=>{
      this.contacts=this.dataservice.get_data();
      console.log("contacts with link",this.contacts)
      this.currentId=params.id
      this.contactCounter=0
      if(this.currentId==undefined){
        this.existedContact=true
      }
      else{
       this.index=this.contacts.findIndex(
          (contact)=>contact["id"]==this.currentId
        )
        console.log("index in home",this.index)
        if(this.index==-1){
          this.existedContact=false
        }
        else{
          this.existedContact=true
        }
      }
    })
  }
}
