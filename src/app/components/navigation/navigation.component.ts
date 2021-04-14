import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  activer=1;
  constructor() { }

  ngOnInit(): void {
  }
  of_activer(){
    this.activer=0;
  }

}
