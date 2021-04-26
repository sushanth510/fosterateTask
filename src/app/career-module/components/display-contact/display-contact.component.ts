import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../model/contact.model';

@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html',
  styleUrls: ['./display-contact.component.scss'],
})
export class DisplayContactComponent implements OnInit {
  contacts: Array<Contact>;
  contact: Contact;
  currentActiveId: number;
  index: number;
  receivedDataObject: object;
  constructor(
    private contactsDataservice: ContactsDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.receivedDataObject = this.contactsDataservice.getData();
      if (this.receivedDataObject['status'] == true) {
        this.contacts = this.receivedDataObject['contactlist'];
      }
      this.currentActiveId = params['id'];
      this.contact = this.contacts.find(
        (contact) => contact.id == this.currentActiveId
      );
      
    });
  }

  edit() {
    this.activatedRoute.params.subscribe((params) => {
      this.currentActiveId = params['id'];
    });
    this.router.navigateByUrl('/home/edit/' + this.currentActiveId);
  }

  delete(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.currentActiveId = params['id'];
    });
    this.contactsDataservice.deleteContact(this.currentActiveId);
    this.receivedDataObject = this.contactsDataservice.getData();
    if (this.receivedDataObject['status']) {
      this.contacts = this.receivedDataObject['contactlist'];
      if (this.contacts.length >= 1) {
        this.currentActiveId = this.contacts[0]['id'];
      }
  
      if (this.currentActiveId != undefined) {
        this.router.navigateByUrl('/home/' + this.currentActiveId);
      }
    }
    else{
      this.router.navigateByUrl('/home')
    }
  }
}
