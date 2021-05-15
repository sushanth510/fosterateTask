import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../../model/contact.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Array<Contact>=[];
  currentActiveId: string;
  currentPath: string;
  receivedDataObject: object;
  contact:Contact;
  constructor(
    private contactsDataservice: ContactsDataService,
    private activatedRoute: ActivatedRoute,
  ) {}
 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.contactsDataservice.getContacts().subscribe((obj)=>{
        if(obj.status){
          this.contacts=obj.contacts;
        }
      })
    })
    
  }
}
