import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
})
export class Home1Component implements OnInit {
  public readonly BtwDescription = `This class includes 7 in-car sessions and a driving exam to obtain your licence. You require a driving learner's 
  permit and to have completed the Driver's Education course.`;

  public readonly DriversEdDescription = `This class is a 30 hour course where you will learn about the
  rules of the road as well as the risks involved with driving.
  This class is required to obtain your license and can be taken
  online or in person.`;

  public readonly DicDescription = `This is an 8 hour course that is for drivers that are
  mandated to take it (by either a court or the DMV) and for drivers want to voluntarily take it to gain
  points on their driving record.`;

  public readonly RexDescription = `This is for people that have failed the Learner's Permit test 3 times. 
  The course consists of one 8 hour in person session where we will go over the information provided in the Virginia Driver's Manual.`;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    $.getScript('../assets/js/main.js');
  }

  onReadMore(link) {
    const page = link === 'dic' ? 'adults' : 'teens'
    this.router.navigate([page], {queryParams: {cc: link}})
  }

  onRegister(link) {
    this.router.navigate(['register'], {queryParams: {cc: link}})
  }
}
