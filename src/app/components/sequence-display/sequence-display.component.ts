import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sequence-display',
  templateUrl: './sequence-display.component.html',
  styleUrls: ['./sequence-display.component.css'],
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

  constructor(protected gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.loadGame();
  }

  // Load the initial game state (called in ngOnInit)
  loadGame() {
    this.sequence = this.gameService.getSequence();  // Get the current sequence
    this.showSequence();  // Display the sequence to the user

    setTimeout(() => {
      this.isSequenceVisible = false;  // Hide the sequence
      this.buttonColors = this.gameService.generateButtonColors();
    }, 15000);
  }

  showSequence1() {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.sequence.length) {
        this.highlightColor(this.sequence[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  showSequence() {
    let index = 0;

    // Clear any previous intervals
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      if (index < this.sequence.length) {
        console.log('Highlighting color at index', index, ':', this.sequence[index]);
        this.highlightColor(this.sequence[index]);
        index++;
      } else {
        console.log('Sequence display complete.');
        clearInterval(this.intervalId);
        //this.isSequenceVisible = false;
      }
    }, 1000);
  }

  // Highlight a color in the sequence
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

  // Validate the user's sequence
  validateSequence() {
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
}
