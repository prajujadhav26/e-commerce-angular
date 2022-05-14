import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private title:Title,
              private meta:Meta) { }

  ngOnInit(): void {
    this.title.setTitle("About component");
    this.meta.addTag({name:'author', content:'Ecom angular project'});
    this.meta.updateTag({name:'keywords', content:'Ecommerce angular project'});
    this.meta.updateTag({name:'description', content:'Creating single product ecommerce project'});
  }
}
