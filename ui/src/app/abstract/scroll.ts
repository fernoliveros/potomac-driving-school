import { ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, take } from "rxjs/operators";

export abstract class ScrollToElement {
    abstract elementToScrollId?

    constructor(
        protected el: ElementRef,
    ) { }
    
    protected scrollToElement() {
        const element: HTMLElement = this.el.nativeElement.querySelector(
            `#${this.elementToScrollId}`
        );

        window.scroll({
            top: this.getTopOffset(element),
            left: 0,
            behavior: "smooth"
        });

        fromEvent(window, "scroll")
            .pipe(
                debounceTime(100),
                take(1)
            )
            .subscribe(() => element.focus());
    }

    private getTopOffset(controlEl: HTMLElement): number {
        const labelOffset = 90;
        return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
    }
}