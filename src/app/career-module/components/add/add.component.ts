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
  loading:boolean=true;
  constructor(
    private contactsDataservice: ContactsDataService,
    private firestore: AngularFirestore
    ) {}
  ngOnInit(): void {
    this.contactsDataservice.getContacts().subscribe((obj)=>{
      this.loading=false
      this.contactsExisting=obj.status;
    }) 
  }
}
