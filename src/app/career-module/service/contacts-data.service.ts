import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsDataService {
  contactsArray: Array<Contact> = [];
  idGenerator = 0;
  index: number;
  contact: Contact;
  status:boolean;
  constructor(
    private firestore: AngularFirestore,
    private toastr:ToastrService
    ) {}

  getContact(id:string): Observable<{contact:Contact,status:boolean}> {
    return new Observable<any>((sub)=>{
      
      this.firestore.doc("contacts/"+id).get().subscribe((contact)=>{
        if(contact && contact.exists){
          this.contact = contact.data() as Contact;
          sub.next({contact:this.contact,status:true})
        }
        else{
          sub.next({contact:null,status:false})
        }
      })
    });
  } 
    
  getContacts():Observable<{contacts:Array<Contact>,status:boolean}> { 
    return new Observable<any>(sub=>{
      const subscriptionRef = this.firestore.collection("contacts").get()
      .subscribe((contacts)=>{
        if(contacts && !contacts.empty){
          this.contactsArray=[]
          contacts.forEach((doc) => {
            this.contact = doc.data() as Contact
            this.contactsArray.push(this.contact);
          }),
          sub.next({contacts:this.contactsArray,status:true})
        }
        else{
          console.log("no contacts")
          sub.next({contacts:null,status:false})
        }
      })
    })

  }
  deleteContact(id:string){
    this.firestore.doc('contacts/' + id).delete();
    this.toastr.success('Contact deleted successfully!')
  }
  updateContact(contact:Contact,id:string){
    this.firestore.doc("contacts/"+id).update(contact)
    this.toastr.success('Contact updated successfully!')
  }
  addContact(contact:Contact){
    this.idGenerator+=1
    let id=this.firestore.firestore.collection("contacts").doc().id;
    contact["id"]=id;
    this.firestore.collection("contacts").doc(id).set(contact)
    this.toastr.success('Contact added successfully!')
    return id;
  }
  
}
