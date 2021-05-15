import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service';
import { Contact } from '../../model/contact.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contacts: Array<Contact> = [];
  receivedDataObject: object;
  contactsExisting: boolean;
  isEmpty:boolean;
  index: number;
  contact: Contact;
  currentPath: string;
  loading: boolean = true;
  constructor(
    private contactsDataservice: ContactsDataService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contactsDataservice.getContacts().subscribe((obj)=>{
      if(obj.status){
        this.isEmpty=false;
        this.loading=false;
        this.contacts=obj.contacts;
        this.currentPath = this.router.url;
        if (this.currentPath == '/home') {
          this.router.navigateByUrl('/home/' + this.contacts[0]['id']);
        }
      }
      else{
        this.loading=false;
        this.isEmpty=true;
      }
      console.log("empty--------",this.isEmpty)
    })
  }
}
