import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ContactsDataService } from '../../service';
import { ActivatedRoute, Router } from '@angular/router'
import { Contact } from '../../model/contact.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm:FormGroup ;
  formData: Contact;
  currentLink:string;
  contactsArray:Array<Contact>
  currentActiveId:number
  index:number;
  receivedDataObject:object;
  formErrors=
  {
    'name':'',
    'email':'',
    'mobile':''
  }
 validationMessages=
 {
   'name':
   {
     'required':' (name is  required)',
   },
   'email':
   {
     'required':' (email is required)',
     'email':' (invalid email)'    },
   'mobile':
   {
     'required':' (phone number is required)',
     'min':' (mobile.no should be of 10 digits)',
     'max':' (mobile.no should be of 10 digits)'
   }
  }
  constructor(private formbuilder:FormBuilder,private contactsDataservice:ContactsDataService,private router:Router,private activatedRoute:ActivatedRoute) {
  this.contactForm=formbuilder.group({
    name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    mobile:['',[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
    landline:[''],
    website:[''],
    address:['']
  })
  }
  ngOnInit(): void {
    this.currentLink=this.router.url;
    this.activatedRoute.params.subscribe(params=>{
      this.currentActiveId=params.id;
    })
    var path="/home/edit/"+this.currentActiveId
    if(this.currentLink==path){
      this.receivedDataObject=this.contactsDataservice.getData()
      if(this.receivedDataObject["status"]==true){
        this.contactsArray=this.receivedDataObject["contactlist"]
      }
      this.index=this.contactsArray.findIndex(
        (contact)=>contact["id"]==this.currentActiveId
      )
      this.contactForm.patchValue({
        name:this.contactsArray[this.index]["name"],
        email:this.contactsArray[this.index]["email"],
        mobile:this.contactsArray[this.index]["mobile"],
        landline:this.contactsArray[this.index]["landline"],
        website:this.contactsArray[this.index]["website"],
        addresss:this.contactsArray[this.index]["address"]
      })
    }
  }

  senddata():void{
    if(this.contactForm.valid){
      let path="/home/edit/"+this.currentActiveId
      this.formData=this.contactForm.value;
      if(this.currentLink==path){
        this.formData["id"]=this.currentActiveId;
        
        this.contactsDataservice.updateContact(this.currentActiveId,this.formData);
      }
      else{
        this.contactsDataservice.addContact(this.formData)
        this.currentActiveId=this.contactsDataservice.idGenerator;
      }
      this.router.navigateByUrl("/home/"+this.currentActiveId)
    }
    else{
      this.validate(this.contactForm,true);
    }
  }

  validate(group:FormGroup=this.contactForm,submittedEmpty:boolean=false):void
  {
    Object.keys(group.controls).forEach( (key:string)=>
    {
      const keyControl=group.get(key);
      this.formErrors[key]="";
      if(submittedEmpty==true)
      {
        keyControl.markAsDirty();
      }
      if(keyControl && !keyControl.valid && (keyControl.dirty || keyControl.touched))
      {
      const messages=this.validationMessages[key];
        for(const errorkey in keyControl.errors)
        {
          if(errorkey)
          {
            this.formErrors[key]+=messages[errorkey]+" ";
          }
        }
      }}
    )
  }
}

