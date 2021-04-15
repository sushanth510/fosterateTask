import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  activeIdAdd:number;
  contacts=new Array();

  constructor(private cds:ContactsDataService) { }

  ngOnInit(): void {
    this.contacts=this.cds.carray
  }

}
