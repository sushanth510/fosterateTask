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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore:AngularFirestore
  ) {}
  // checkStatus(){
  //   this.contactsDataservice.get().valueChanges().subscribe(data => {
  //     this.loading = false;
  //     if(data.length == 0){
  //       this.status = false;
  //     }else{
  //       this.status = true;
  //     }
  //   })
  // }
  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe((params) => {
      // this.receivedDataObject = this.contactsDataservice.getData();
      // if (this.receivedDataObject['status'] == true) {
      //    this.contacts = this.receivedDataObject['contactlist'];
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
      this.currentActiveId = params['id'];
      this.currentPath = this.router.url;
      if (this.currentPath == '/home')
        this.router.navigateByUrl('/home/' + this.contacts[0]['id']);
    });
  }
}
