import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Fosterate';
  href:string
  
  currentActiveId:number;
  constructor(private rt:Router,private ar:ActivatedRoute){
    
    

  }
  ngOnInit(): void {
    this.ar.params.subscribe(params=>{
      this.currentActiveId=params["id"]

      this.href=this.rt.url;
    })

}
    
  
}
