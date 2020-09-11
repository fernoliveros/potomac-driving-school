import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teens',
  templateUrl: './teens.component.html',
  styleUrls: ['./teens.component.css'],
})
export class TeensComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onRegister(classCode: string): void {
    this.router.navigate(['/register'], { queryParams: { cc: classCode } });
  }
}
