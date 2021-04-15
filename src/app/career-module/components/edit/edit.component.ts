import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  href:string;
  constructor(private rt:Router) { }

  ngOnInit(): void {
    console.log("entered edit component")
    this.href=this.rt.url
    console.log("href in edit",this.href)
  }
}
