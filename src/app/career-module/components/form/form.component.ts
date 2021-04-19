import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ContactsDataService } from '../../service/contacts-data.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm:FormGroup ;
  formData: object;
  idCounter=3;
  currentLink:string;
  contactsArray:object[]
  currentActiveId:number
  submitBoolean:boolean=true;
  index:number;
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
  constructor(private formbuilder:FormBuilder,private dataService:ContactsDataService,private router:Router,private activatedRoute:ActivatedRoute) {
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
    var path="/edit/"+this.currentActiveId
    if(this.currentLink==path){
      this.contactsArray=this.dataService.get_data();
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
      this.submitBoolean=true
      let path1="/edit/"+this.currentActiveId
      this.formData=this.contactForm.value;
      if(this.currentLink==path1){
        this.dataService.update_contact(this.currentActiveId,this.formData)
      }
      else{
        this.dataService.newcontact(this.formData)
        this.currentActiveId=this.dataService.idGenerator;
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
      const abstractcontrol=group.get(key);
      this.formErrors[key]="";
      if(submittedEmpty==true)
      {
          abstractcontrol.markAsDirty();
      }
      if(abstractcontrol && !abstractcontrol.valid && (abstractcontrol.dirty || abstractcontrol.touched))
      {
      const messages=this.validationMessages[key];
        for(const errorkey in abstractcontrol.errors)
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

