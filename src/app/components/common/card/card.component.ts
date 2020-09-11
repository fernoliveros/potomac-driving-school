import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() iconPath: string;
  @Input() title: string;
  @Output() register = new EventEmitter();

  onRegister() {
    this.register.emit();
  }
}
