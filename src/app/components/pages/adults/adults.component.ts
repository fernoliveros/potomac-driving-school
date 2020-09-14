import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adults',
  templateUrl: './adults.component.html',
  styleUrls: ['./adults.component.css'],
})
export class AdultsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onRegister(classCode: string): void {
    this.router.navigate(['/register'], { queryParams: { cc: classCode } });
  }
}
