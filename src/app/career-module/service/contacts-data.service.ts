import { Injectable } from '@angular/core';
import { contact } from '../model/contact.model'
@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {
  contactsArray=new Array()
  idGenerator=0;
  index:number;
  contact:object
  constructor() { 
  }
  get_data():object[]{
    return this.contactsArray
  }
  
  newcontact(new_contact:object):void{
  this.idGenerator+=1
  new_contact["id"]=this.idGenerator;
  this.contact = new contact(new_contact)
  this.contactsArray.push(this.contact)
  }

  delete_contact(id:number):void{
    this.index=this.contactsArray.findIndex(
      (contact)=>contact.id==id
    )
    this.contactsArray.splice(this.index,1);
  }
  
  update_contact(id:number,obj:object):void{
    obj["id"]=id;
    this.index=this.contactsArray.findIndex(
      (contact)=>contact.id==id
    )
    this.contactsArray[this.index]=obj
    }
}

