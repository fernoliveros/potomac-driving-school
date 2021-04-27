import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollToElement } from 'src/app/abstract/scroll';

@Component({
  selector: 'app-adults',
  templateUrl: './adults.component.html',
  styleUrls: ['./adults.component.css'],
})
export class AdultsComponent extends ScrollToElement implements OnInit {
  public elementToScrollId = 'dicCard'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected el: ElementRef) {
      super(el)
     }

  ngOnInit(): void {
    this.route.queryParams.subscribe((qp: { cc: string }) => {
      setTimeout(() => {
        if (qp.cc && qp.cc === 'dic') {
         this.scrollToElement()
        }
      })
    });
  }

  public onRegister(classCode: string): void {
    this.router.navigate(['/register'], { queryParams: { cc: classCode } });
  }
}
