import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  private startYear = 2007
  public readonly yearsOfExperience = new Date().getFullYear() - this.startYear;
  public readonly licencesIssued = this.yearsOfExperience * 12 * 60
  
  constructor() {}

  ngOnInit(): void {
    console.log(this.licencesIssued)
  }
}
