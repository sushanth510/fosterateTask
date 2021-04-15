import { Injectable } from '@angular/core';
import {contact} from '../model/contact.model'

@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {
  carray=new Array()
  activeId:number =1;
  

  constructor() { 
    
  }
obj1=new contact(1,"Harsha Vardhan Pendyala","harsha@fosterate.com",7777888855,null,"","hyderabad");
obj2=new contact(2,"Network Duke","duke@fosterate.com",7777888855,null,"","hyderabad");
obj3=new contact(3,"Arshaque Mohammed","arshaque@fosterate.com",7777888855,null,"","hyderabad");
obj4={}
length=this.carray.push(this.obj1)
length1=this.carray.push(this.obj2)
length2=this.carray.push(this.obj3)
id_generator=3;
newcontact(obj:object):void{
  this.id_generator+=1
  
  this.obj4 = new contact(this.id_generator,obj["name"],obj["email"],obj["mobile"],null,"","")
  this.carray.push(this.obj4)
  
  
}
delete_contact(id:number):void{
  for(var i=0;i<this.carray.length;i++)
    {
        if(this.carray[i]["c_id"]==id)
        {
            this.carray.splice(i,1);
            console.log("deleted a contact")
        }
    }
    console.log("----------------------------------------------------------")

}
update_contact(id:number,obj:object):void{
  for(var i=0;i<this.carray.length;i++)
    {
        if(this.carray[i]["c_id"]==id)
        {
            this.carray[i]["name"]=obj["name"]
            this.carray[i]["email"]=obj["email"]
            this.carray[i]["mobile"]=obj["mobile"]
        }
    }

}

}

