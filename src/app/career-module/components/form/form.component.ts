import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { ContactsDataService } from '../../service/contacts-data.service';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm:FormGroup ;
  formdata: object;
  id_counter=3;
  href:string;
  carray:number[]
  currentActiveId:number
  submit_boolean:boolean=true;
  formerrors=
 {
   'name':'',
   'email':'',
   'mobile':''
 }
 validationmessages=
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
  


  constructor(private fb:FormBuilder,private cds:ContactsDataService,private rt:Router,private ar:ActivatedRoute) {
    this.contactForm=fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
      landline:[''],
      website:[''],
      address:['']
    })
   }

  ngOnInit(): void {
    this.href=this.rt.url;
    console.log("href in forms",this.href)
    this.ar.params.subscribe(params=>{
      this.currentActiveId=params.id;

    })
    var path="/edit/"+this.currentActiveId

    
    if(this.href==path){
      this.carray=this.cds.carray;
      console.log("entered /edit condition")
      
      
      for(var i=0;i<this.carray.length;i++)
      {
          if(this.carray[i]["c_id"]==this.currentActiveId)
          {
            console.log("ready to patch")
            this.contactForm.patchValue({
              name:this.carray[i]["name"],
              email:this.carray[i]["email"],
              mobile:this.carray[i]["mobile"]
            })
            break;
          }
      }
    }
  }

  senddata():void{
    if(this.contactForm.valid){
      this.submit_boolean=true
      let path1="/edit/"+this.currentActiveId
    this.formdata=this.contactForm.value;
    if(this.href==path1){
      console.log("submitted edit button---------------------")
      this.cds.update_contact(this.currentActiveId,this.formdata)
    }
    else{
      this.cds.newcontact(this.formdata)
      this.currentActiveId=this.cds.id_generator;
    }
    this.rt.navigateByUrl("/home/"+this.currentActiveId)


    }
    else{
      this.CheckValid(this.contactForm,true);
    }
  }
  CheckValid(group:FormGroup=this.contactForm,submittedempty:boolean=false):void
  {
    Object.keys(group.controls).forEach( (key:string)=>
    {
      const abstractcontrol=group.get(key);
      
      

      this.formerrors[key]="";

      if(submittedempty==true)
      {
          abstractcontrol.markAsDirty();
      }

      if(abstractcontrol && !abstractcontrol.valid && (abstractcontrol.dirty || abstractcontrol.touched))
      {
      
      const messages=this.validationmessages[key];

        for(const errorkey in abstractcontrol.errors)
        {
          
          if(errorkey)
          {
            this.formerrors[key]+=messages[errorkey]+" ";
            
          }
        }
        
      }}
   
    )
  }
}

