import {Component, OnInit} from '@angular/core';
import {faqs} from '../FAQ';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs = faqs;

  constructor() { }

  ngOnInit(): void {
  }

}
