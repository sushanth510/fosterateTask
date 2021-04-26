import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model'
@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {
  contactsArray:Array<Contact>=[];
  idGenerator=0;
  index:number;
  contact:Contact;
  constructor() { 
   
  }
  getData(): { contactlist: Array<Contact>; status: boolean } {
    if (this.contactsArray.length == 0) {
      return { contactlist: null, status: false };
    } else {
      return { contactlist: this.contactsArray, status: true };
    }
  }
    
  addContact(new_contact:object):void{
    if(new_contact!=null){
      this.idGenerator+=1;
      new_contact["id"]=this.idGenerator;
      this.contact=new Contact(new_contact)
      this.contactsArray.push(this.contact);
    }
  }

  deleteContact(id:number):void{
    this.index=this.contactsArray.findIndex(
      (contact)=>contact.id==id
    )
    this.contactsArray.splice(this.index,1);
  }
  
  updateContact(id:number,obj:Contact):void{
    
    this.index=this.contactsArray.findIndex(
      (contact)=>contact.id==id
    )
    this.contactsArray[this.index]=obj
    }
}

