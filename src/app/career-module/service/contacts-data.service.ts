import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsDataService {
  contactsArray: Array<Contact> = [];
  idGenerator = 0;
  index: number;
  contact: Contact;
  constructor(private firestore: AngularFirestore) {}

  getData(): { contactlist: Array<Contact>; status: boolean } {
    // this.firestore.collection("contacts").snapshotChanges().subscribe(contactsArray=>{
    //   this.contactsArray=contactsArray.map(contact=>{
    //     return {
    //       id:contact.payload.doc.id,
    //       ...(contact.payload.doc.data() as object) as Contact
    //     }
    //   })
    // })
    let contactsDoc = this.firestore.firestore.collection('contacts');
    contactsDoc.get().then((contacts) => {
      this.contactsArray = [];
      contacts.forEach((doc) => {
      
        this.contact = {
          id: doc.id,
          ...((doc.data() as object) as Contact),
        };
        this.contactsArray.push(this.contact);
      });
    });

    if (this.contactsArray.length == 0) {
      return { contactlist: null, status: false };
    }
    return { contactlist: this.contactsArray, status: true };
  }
}
