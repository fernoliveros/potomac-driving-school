import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  public readonly yearsOfExperience = new Date().getFullYear() - 2007;
  constructor() {}

  ngOnInit(): void {}
}
