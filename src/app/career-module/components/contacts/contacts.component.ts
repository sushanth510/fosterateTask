import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../../model/contact.model';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Array<Contact>;
  currentActiveId: number = 1;
  currentPath: string;
  receivedDataObject: object;
  constructor(
    private contactsDataservice: ContactsDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.receivedDataObject = this.contactsDataservice.getData();
      if (this.receivedDataObject['status'] == true) {
        this.contacts = this.receivedDataObject['contactlist'];
      }
      this.currentActiveId = params['id'];
      this.currentPath = this.router.url;
      if (this.currentPath == '/home')
        this.router.navigateByUrl('/home/' + this.contacts[0]['id']);
    });
  }

  updateId(id:any):void{
    this.currentActiveId=id;
    this.router.navigateByUrl("/home/"+id)
  }
}
