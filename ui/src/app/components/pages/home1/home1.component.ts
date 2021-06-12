import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdultModal } from '../../common/adult.modal/adult.modal';
declare var $: any;

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
})
export class Home1Component implements OnInit {
  public readonly BtwDescription = `This class is taken to obtain your driver's license. It consists of 7 in-car sessions and a driving exam. To take it, you require a driving learner's 
  permit and to have completed the Driver's Education course.`;

  public readonly DriversEdDescription = `This class is a 30 hour course where you will learn about the
  rules of the road as well as the risks involved with driving.
  This class is required to obtain your license and can be taken
  online or in person.`;

  public readonly DicDescription = `This is an 8 hour course that is for drivers that are
  mandated to take it (by either a court or the DMV) and for drivers who want to voluntarily take it to gain
  points on their driving record.`;

  public readonly RexDescription = `This is for people that have failed the Learner's Permit test 3 times. 
  The course consists of one 8 hour in person session where we will go over the information provided in the Virginia Driver's Manual.`;


  private classNameMap = new Map([
    ["btw", "Behind the Wheel"],
    ["deo", "Driver's Education"],
    ["dic", "Driver Improvement Clinic"],
    ["re", "Re-Examination"],
  ])
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    $.getScript('../assets/js/main.js');
  }

  onReadMore(classCode: string) {
    const className = this.classNameMap.get(classCode)

    const isAdultModal = this.dialog.open(AdultModal, {
      data: { className }
    });

    isAdultModal.afterClosed().subscribe((isAdult: boolean) => {
      console.log("I'm and adult", isAdult)
      if (isAdult !== undefined) {
        const page = isAdult ? 'adults' : 'teens'
        this.router.navigate([page], { queryParams: { cc: classCode } })
      }

    });
  }

  onRegister(link) {
    this.router.navigate(['register'], { queryParams: { cc: link } })
  }
}
