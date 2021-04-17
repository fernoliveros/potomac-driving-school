import { Directive, ElementRef, HostListener } from '@angular/core';


/**
 * Only to be used on inputs that want to have phone number
 * in this format (XXX) XXX - XXXX.
 * Not to be used on any other elements or for phone numbers
 * with different formats
 */
@Directive({
  selector: '[phoneNumber]'
})
export class PhoneNumberDirective {

    constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(e): void {
    const phoneNum = e.target.value
    const isDelete = e.key === "Backspace"

    if (isDelete) {
      this.handlePhoneDelete(phoneNum, e)
    } else {
      this.handlePhoneAddChar(phoneNum, e)
    }
  }

  private handlePhoneDelete(phoneNum, e): void {
    const len = phoneNum.length
    switch (len) {
      case 12:
        this.setPhone(phoneNum.substr(0,8), e)
        break
      case 6:
        this.setPhone(phoneNum.substr(0,3), e)
        break
      case 2:
        this.setPhone('',e)
        break
    }
  }

  private handlePhoneAddChar(phoneNum, e): void {
    const len = phoneNum.length
    const newChar = e.key
    if (!/\d/.test(newChar)) {
      this.stopEvent(e)
    } else {
      switch (len) {
        case 0:
          this.setPhone('(' + phoneNum + newChar, e)
          break
        case 3:
          this.setPhone(phoneNum + newChar + ') ', e)
          break
        case 8:
          this.setPhone(phoneNum + newChar + ' - ', e)
          break
        case 16:
          this.stopEvent(e)
      }
    }
  }

  private stopEvent(e): void {
    e.preventDefault();
    e.stopPropagation();
  }

  private setPhone(formattedPhone, e): void {
    this.stopEvent(e)
    this.el.nativeElement.value = formattedPhone
  }
}