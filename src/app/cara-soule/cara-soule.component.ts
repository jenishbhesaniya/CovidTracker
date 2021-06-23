import { Component, ViewChild , AfterViewInit } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
declare var anime: any;
@Component({
  selector: 'app-cara-soule',
  templateUrl: './cara-soule.component.html',
  styleUrls: ['./cara-soule.component.css']
})
export class CaraSouleComponent implements AfterViewInit   {
  images = ['https://www.constructionexec.com/assets/site_18/images/article/050620030611.jpg?width=1280', 'https://imgk.timesnownews.com/story/iStock-1291166925_3.jpg?tr=w-1200,h-900',
  'https://images.assettype.com/fortuneindia%2F2021-02%2F4e4bd823-a895-4f2e-9b66-88d1929fe155%2F2DADTDE.jpg?auto=format&q=35&w=1200&rect=0,625,6000,3375','https://cdn-res.keymedia.com/cms/images/us/039/0132_637563566442439701.jpg'
];
  constructor() { }
  ngAfterViewInit(): void {
  console.log('animation');

  anime.timeline({loop: true})
    .add({
      targets: '.c2 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el: any, i: number) => 500 + 30 * i
    }).add({
      targets: '.c2 .letter',
      translateX: [0,-30],
      opacity: [1,0],
      easing: "easeInExpo",
      duration: 1100,
      delay: (el: any, i: number) => 100 + 30 * i
    });
  }





  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
