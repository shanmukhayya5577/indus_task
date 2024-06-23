import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-agency',
  templateUrl: './landing-agency.component.html',
  styleUrls: ['./landing-agency.component.css']
})
export class LandingAgencyComponent implements OnInit {
  targetPercentage: number = 92;
  displayedPercentage: number = 0;
  speed: number = 1000;

  constructor() { }

  ngOnInit(): void {
    this.animatePercentage();
  }
  animatePercentage(): void {
    const increment = this.targetPercentage / this.speed;
    const updateCount = () => {
      if (this.displayedPercentage < this.targetPercentage) {
        this.displayedPercentage = Math.min(this.targetPercentage, Math.ceil(this.displayedPercentage + increment));
        setTimeout(updateCount, 20);
      } else {
        this.displayedPercentage = this.targetPercentage;
      }
    };
    updateCount();
  }
}
