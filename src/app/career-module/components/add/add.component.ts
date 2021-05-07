import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../../model/contact.model';
import { ContactsDataService } from '../../service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  receivedDataObject: object;
  contacts: Array<Contact>=[];
  contactsExisting: boolean=false;
  contact:Contact;
  constructor(
    private contactsDataservice: ContactsDataService,
    private firestore: AngularFirestore
    ) {}
  ngOnInit(): void {
    this.receivedDataObject = this.contactsDataservice.getData();
    if (this.receivedDataObject['status'] == true) {
      this.contacts = this.receivedDataObject['contactlist'];
    }
    if(this.contacts.length==0){
      this.contactsExisting = false
    }
    else{
      this.contactsExisting = true
    }
    
  }
}
