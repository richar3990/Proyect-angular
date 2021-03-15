import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public web: string;

  constructor() {
    this.title = 'Richar Meza';
    this.subtitle = 'Full Stack web developer';
    this.web = 'www.surdevs.com.py';
  }

  ngOnInit(): void {
  }

}
