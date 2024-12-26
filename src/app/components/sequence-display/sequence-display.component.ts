import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-sequence-display',
  templateUrl: './sequence-display.component.html',
  styleUrls: ['./sequence-display.component.css'],
  animations: [
    trigger('highlight', [
      state('default', style({ opacity: 1 })),
      state('highlighted', style({ opacity: 0.5 })),
      transition('default <=> highlighted', animate('500ms ease-in-out')),
    ]),
  ],
  imports: [
    CommonModule,
  ],
  standalone: true
})
export class SequenceDisplayComponent {
  sequence: string[] = [];
  buttonColors: string[] = [];
  userSequence: string[] = [];
  isSequenceVisible: boolean = true;
  private intervalId: any;
  activeIndex: number | null = null; // Tracks the current active color index


  constructor(protected gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.loadGame();
  }

  loadGame() {
    this.sequence = this.gameService.getSequence();
    this.showSequence();

    setTimeout(() => {
      this.isSequenceVisible = false;
      this.buttonColors = this.gameService.generateButtonColors();
    }, 15000);
  }

  showSequence(index = 0) {
    if (index < this.sequence.length) {
      this.activeIndex = index; // Set the active index to highlight the color
      setTimeout(() => {
        this.activeIndex = null; // Clear the active index
        this.showSequence(index + 1); // Move to the next color
      }, 1000);
    } else {
      console.log('Sequence display complete.');
    }
  }

  validateSequence() {
    const isValid = this.gameService.validateUserSequence();

    if (isValid) {
      this.gameService.addColor();
      this.gameService.levelUp();

      this.resetUserSequence();
      this.isSequenceVisible = true;

      setTimeout(() => {
        this.loadGame();
      }, 1000);
    } else {
      this.router.navigate(['/scoring']);
    }
  }


  showSequence1() {
    let index = 0;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      if (index < this.sequence.length) {
        this.highlightColor(this.sequence[index]);
        index++;
      } else {
        console.log('Sequence display complete.');
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  highlightColor(color: string) {
    const index = this.sequence.indexOf(color);
    const element = document.querySelectorAll('.color-box')[index];

    if (element) {
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 1000);
    }
  }

  addUserColor(color: string) {
    this.gameService.addToUserSequence(color);
    this.userSequence.push(color);
  }

  validateSequence1() {
    const isValid = this.gameService.validateUserSequence();

    if (isValid) {
      this.gameService.addColor();
      this.gameService.levelUp();

      this.userSequence = [];
      this.gameService.clearUserSequence(); // Clear service-side sequence

      this.sequence = this.gameService.getSequence();
      this.buttonColors = this.gameService.generateButtonColors();

      this.isSequenceVisible = true;
      setTimeout(() => {
        this.isSequenceVisible = false;
      }, this.sequence.length * 1000 + 1000);
    } else {
      this.router.navigate(['/scoring']);
    }
  }

  // Reset the user's sequence
  resetSequence() {
    this.gameService.clearUserSequence();
    this.userSequence = [];
  }

  resetUserSequence() {
    this.userSequence = [];
    this.gameService.clearUserSequence();
  }
}
