import { Component, OnInit } from '@angular/core';
import { Contact } from '../../model/contact.model';
import { ContactsDataService } from '../../service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  receivedDataObject: object;
  contacts: Array<Contact>;
  contactsExisting: boolean=false;
  constructor(private contactsDataservice: ContactsDataService) {}
  ngOnInit(): void {
    this.receivedDataObject = this.contactsDataservice.getData();
    if (this.receivedDataObject['status'] == true) {
      this.contacts = this.receivedDataObject['contactlist'];
    }
    this.contactsExisting = this.receivedDataObject['status'];
  }
}
