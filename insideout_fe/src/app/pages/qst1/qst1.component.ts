import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';  // Importation du Router


@Component({
  selector: 'app-qst1',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './qst1.component.html',
  styleUrls: ['./qst1.component.css']
})
export class Qst1Component implements AfterViewInit {
  barBackgrounds: { [key: string]: string } = {
    excellent: '#F4F3AC',
    good: '#524C84',
    fair: '#3971FF',
    poor: '#F4A84C',
    terrible: '#FF4639',
  };

  mainBackgrounds: { [key: string]: string } = {
    excellent: 'lightyellow',
    good: '#C0B0C4',
    fair: 'lightblue',
    poor: '#FFE4BC',
    terrible: 'lightpink',
  };

  activeOption: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2,private router: Router, private authService: AuthService) {}
  prenom: string | null = '';
  /*logout() {
    this.authService.logout(); // This is where the actual logout logic happens
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
  ngOnInit() {
    this.prenom = localStorage.getItem('prenom');
  }*/

  ngAfterViewInit(): void {
    const slidingParts = Array.from(
      this.el.nativeElement.querySelectorAll('.sliding-part')
    ) as HTMLElement[];

    const gaps = Array.from(
      this.el.nativeElement.querySelectorAll('.faux-gap')
    ) as HTMLElement[];

    const main = this.el.nativeElement.querySelector('main') as HTMLElement;

    slidingParts.forEach((part) => {
      this.renderer.listen(part, 'click', (e) =>
        this.switchActiveOption(e, slidingParts, gaps, main)
      );
    });
  }

  switchActiveOption(
    event: Event,
    slidingParts: HTMLElement[],
    gaps: HTMLElement[],
    main: HTMLElement
  ): void {
    const target = event.currentTarget as HTMLElement;

    if (this.activeOption) {
      this.renderer.removeClass(this.activeOption, 'active');
    }
    this.activeOption = target;
    this.renderer.addClass(this.activeOption, 'active');

    const quality = this.activeOption.dataset['quality'] || '';
    const barColor = this.barBackgrounds[quality as keyof typeof this.barBackgrounds];
    const mainColor = this.mainBackgrounds[quality as keyof typeof this.mainBackgrounds];
    const activeId = Number(this.activeOption.dataset['id']);

    slidingParts.forEach((part, index) => {
      this.renderer.setStyle(
        part,
        'background',
        index <= activeId ? barColor : 'white'
      );
    });

    gaps.forEach((gap, index) => {
      this.renderer.setStyle(
        gap,
        'backgroundColor',
        index < activeId ? barColor : 'white'
      );
    });

    this.renderer.setStyle(
      this.activeOption,
      'background',
      `linear-gradient(to bottom, white 0%, white 50%, ${barColor} 50%, ${barColor} 100%)`
    );

    const marker = this.activeOption.querySelector('.circle') as HTMLElement;
    if (marker) {
      this.renderer.setStyle(marker, 'background', barColor);
      this.renderer.setStyle(
        marker,
        'filter',
        `drop-shadow(0px 4px 4px ${barColor})`
      );
    }

    this.renderer.setStyle(main, 'background', mainColor);
  }

}
