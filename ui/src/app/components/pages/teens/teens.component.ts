import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollToElement } from 'src/app/abstract/scroll';

@Component({
  selector: 'app-teens',
  templateUrl: './teens.component.html',
  styleUrls: ['./teens.component.css'],
})
export class TeensComponent extends ScrollToElement implements OnInit {

  public elementToScrollId = 'deoCard'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected el: ElementRef) {
    super(el)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((qp: { cc: string }) => {
      setTimeout(() => {
        if (qp.cc) {
          if (qp.cc === 'deo') {
            this.scrollToElement()
          } else if (qp.cc === 'dic') {
            this.elementToScrollId = 'dicCard'
            this.scrollToElement()
          } else {
            this.scrollToPosition(0)
          }
        }
      })
    });
  }

  public onRegister(classCode: string): void {
    this.router.navigate(['/register'], { queryParams: { cc: classCode } });
  }
}