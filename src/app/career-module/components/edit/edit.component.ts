import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  currentLink:string;
  constructor(private router:Router) { }
  ngOnInit(): void {
    this.currentLink=this.router.url
  }
}
