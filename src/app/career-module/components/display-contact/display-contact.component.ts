import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../model/contact.model';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html',
  styleUrls: ['./display-contact.component.scss'],
})
export class DisplayContactComponent implements OnInit {
  contacts: Array<Contact>=[];
  contact: Contact;
  currentActiveId: string;
  index: number;
  receivedDataObject: object;
  address:string="";
  addressArray=new Array();
  constructor(
    private contactsDataservice: ContactsDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore:AngularFirestore
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      // this.receivedDataObject = this.contactsDataservice.getData();
      // if (this.receivedDataObject['status'] == true) {
      //   this.contacts = this.receivedDataObject['contactlist'];
      // }
      let contactsDoc = this.firestore.firestore.collection('contacts');
      contactsDoc.get().then((contacts) => {
      this.contacts = [];
      this.currentActiveId = params['id'];
      contacts.forEach((doc) => {
        if(doc.id==this.currentActiveId){
          this.contact = {
            id: doc.id,
            ...((doc.data() as object) as Contact),
          };
        } 
      });
    });
      // this.contact = this.contacts.find(
      //   (contact) => contact.id == this.currentActiveId
      // );
      console.log("the active contact is",this.contact)
      this.address=this.contact["address"];
      this.addressArray=this.address.split(",")
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
    this.receivedDataObject = this.contactsDataservice.getData();
    if (this.receivedDataObject['status']) {
      this.contacts = this.receivedDataObject['contactlist'];
      this.index=this.contacts.findIndex(
        contact=>contact.id==this.currentActiveId
      )
      // this.contactsDataservice.deleteContact(this.currentActiveId);
      this.firestore.doc("contacts/"+this.currentActiveId).delete();
      if(this.index==0){
        if(this.contacts[this.index+1]==undefined){
          this.router.navigateByUrl('/home')
        }
        else{
          this.router.navigateByUrl('/home/'+this.contacts[this.index]["id"])
        }
      }
      else{
        this.router.navigateByUrl("/home/"+this.contacts[(this.index)-1]["id"])
      }
    }
  }
}
