import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  	$.getScript("../assets/js/main.js");
  }

}
