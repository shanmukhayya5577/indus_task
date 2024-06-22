import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  sideBarOpen = true;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  landingPage(){
    this.route.navigate(['landing','agency'])
  }
}
