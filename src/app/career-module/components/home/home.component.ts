import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service';
import { Contact } from '../../model/contact.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contacts:Array<Contact>;
  contactsExisting: boolean;
  receivedDataObject: object;
  index: number;
  constructor(private contactsDataservice: ContactsDataService) {}
  ngOnInit(): void {
    this.receivedDataObject = this.contactsDataservice.getData();
    this.contactsExisting = this.receivedDataObject['status'];
    if (this.receivedDataObject['status'] == true) {
      this.contacts = this.receivedDataObject['contactlist'];
    }
  }
}
