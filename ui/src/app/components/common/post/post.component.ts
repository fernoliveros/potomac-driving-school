import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() imgPath: string;
  @Input() title: string;
  @Input() description: string;
  @Input() showReadmore = true;
  @Output() register = new EventEmitter();
  @Output() readMore = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onRegister() {
    this.register.emit();
  }
  onReadMore() {
    this.readMore.emit();
  }
}
