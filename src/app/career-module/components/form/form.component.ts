import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ContactsDataService } from '../../service';
import { ActivatedRoute, Router } from '@angular/router'
import { Contact } from '../../model/contact.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm:FormGroup ;
  formData: Contact;
  contact:Contact;
  currentLink:string;
  contacts:Array<Contact>=[];
  currentActiveId:any;
  index:number;
  receivedDataObject:object;
  currentPath:String;
  path:String;
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
     'pattern':' (invalid email)'    },
   'mobile':
   {
     'required':' (phone number is required)',
     'min':' (mobile.no should be of 10 digits)',
     'max':' (mobile.no should be of 10 digits)'
   }
  }
  constructor(private formbuilder:FormBuilder,
              private contactsDataservice:ContactsDataService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private firestore:AngularFirestore,) {
  this.contactForm=formbuilder.group({
    name:['',Validators.required],
    email:['',[Validators.required,Validators.pattern("[A-Z a-z 0-9 \. \- \_]+[\@][a-z]{2,10}[\.][a-z]{2,4}")]],
    mobile:['',[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
    landline:[''],
    website:[''],
    address:['']
  })
  }
  ngOnInit(): void {
    this.contactForm.valueChanges.subscribe(()=>
     {
      this.validate(this.contactForm);
     })
    this.currentLink=this.router.url;
    this.activatedRoute.params.subscribe(params=>{
      this.currentActiveId=params.id;
    })
    this.path="/home/edit/"+this.currentActiveId
    if(this.currentLink==this.path){
      this.contactsDataservice.getContact(this.currentActiveId).subscribe((obj)=>{
        if(obj.status){
          this.contact=obj.contact;
        }
       
        this.contactForm.patchValue({
          name:this.contact["name"],
          email:this.contact["email"],
          mobile:this.contact["mobile"],
          landline:this.contact["landline"] ,
          website:this.contact["website"] ,
          address:this.contact["address"] 
        })
      })
     
    }
    
  }


  senddata():void{
    if(this.contactForm.valid){
      let path="/home/edit/"+this.currentActiveId
      this.formData=this.contactForm.value;
      if(this.currentLink==path){
        this.firestore.doc("contacts/"+this.currentActiveId).update(this.formData)
        this.contactsDataservice.update(this.formData,this.currentActiveId)
        this.router.navigateByUrl("/home/"+this.currentActiveId)
      }
      else{
        let contactId=this.contactsDataservice.add(this.formData);
        this.router.navigateByUrl("/home/"+contactId);  
      } 
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

