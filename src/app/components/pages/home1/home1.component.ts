import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
})
export class Home1Component implements OnInit {
  public readonly BtwDescription = `This class includes 7 sessions at the end of which you will take a driving exam to obtain your licence. You require a driving learner's 
  permit and to have completed the Driver's Education course, or be enrolled in it with our school.`;

  public readonly DriversEdDescription = `This class is a 30 hour course where you will learn about the
  rules of the road as well as the risks involved with driving.
  This class is required to obtain your license and can be taken
  online or in person.`;

  public readonly DicDescription = `This is an 8 hour course that is for drivers that need to gain
  points back on their driving record, and for drivers that are
  mandated to take it by either a court or the DMV.`;

  constructor() {}

  ngOnInit(): void {
    $.getScript('../assets/js/main.js');
  }

  onReadMore(link) {
    console.log(link);
  }

  onRegister(link) {
    console.log(link);
  }
}
