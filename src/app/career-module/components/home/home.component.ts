import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service';
import { Contact } from '../../model/contact.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contacts:Array<Contact>=[];
  receivedDataObject: object;
  contactsExisting:boolean;
  index: number;
  contact:Contact;
  constructor(
    private contactsDataservice: ContactsDataService,
    private firestore:AngularFirestore
    ) {}
  ngOnInit(): void {
    // this.receivedDataObject = this.contactsDataservice.getData();
    // this.contactsExisting = this.receivedDataObject['status'];
    // if (this.receivedDataObject['status'] == true) {
    //   this.contacts = this.receivedDataObject['contactlist'];
    // }
    let contactsDoc = this.firestore.firestore.collection('contacts');
    contactsDoc.get().then((contacts) => {
      this.contacts = [];
      contacts.forEach((doc) => {
      
        this.contact = {
          id: doc.id,
          ...((doc.data() as object) as Contact),
        };
        this.contacts.push(this.contact);
      });
    });
    
  }
}
