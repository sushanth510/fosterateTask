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
  contacts: Array<Contact> = [];
  contact: Contact;
  currentActiveId: string;
  index: number;
  receivedDataObject: object;
  address: string = '';
  addressArray = new Array();
  constructor(
    private contactsDataservice: ContactsDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.currentActiveId = params['id'];
      let data = this.contactsDataservice.getContact(this.currentActiveId);
      data.subscribe((obj) => {
        if(obj.status){
          this.contact = obj.contact;
        }
        
      });
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
    this.contactsDataservice.delete(this.currentActiveId)
    this.contactsDataservice.getContacts().subscribe((obj) => {
      if(obj.status){
        this.contacts=obj.contacts;
        console.log("contacts after delte",this.contacts)
        
          this.router.navigateByUrl('/home');
    
      }
      else{
        this.router.navigateByUrl('/home')
      }
    });
    
  }
}
