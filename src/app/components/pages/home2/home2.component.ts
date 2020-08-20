import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  	$.getScript("../assets/js/main.js");
  }

}
