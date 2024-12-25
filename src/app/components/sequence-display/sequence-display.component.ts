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
  isSequenceVisible: boolean = true;  // Controls which phase is visible

  constructor(protected gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.loadGame();
  }

  // Load the initial game state (called in ngOnInit)
  loadGame() {
    this.sequence = this.gameService.getSequence();  // Get the current sequence
    this.showSequence();  // Display the sequence to the user

    // Wait for 15 seconds before switching to the button phase
    setTimeout(() => {
      this.isSequenceVisible = false;  // Hide the sequence
      this.buttonColors = this.gameService.generateButtonColors();  // Get available button colors
    }, 15000);
  }

  // Show the sequence with a delay for each color
  showSequence() {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.sequence.length) {
        this.highlightColor(this.sequence[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);  // Show each color for 1 second
  }

  // Highlight a color in the sequence
  highlightColor(color: string) {
    const index = this.sequence.indexOf(color);
    const element = document.querySelectorAll('.color-box')[index];

    if (element) {
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 500);  // Remove highlight after 500ms
    }
  }

  // Add a color to the user's sequence when they click a button
  addUserColor(color: string) {
    this.gameService.addToUserSequence(color);
    this.userSequence.push(color);
  }

  // Validate the user's sequence
  validateSequence() {
    const isValid = this.gameService.validateUserSequence();

    if (isValid) {
      this.gameService.addColor();  // Add a new color to the sequence
      this.gameService.levelUp();  // Increase the level

      // Clear the user's sequence for the next round
      this.userSequence = [];
      this.gameService.clearUserSequence();

      // Update the sequence for the next round
      this.sequence = this.gameService.getSequence();

      // Update buttonColors to reflect the updated sequence
      this.buttonColors = this.gameService.generateButtonColors();

      // Show the sequence again and hide the button phase after 2 seconds
      this.isSequenceVisible = true;
      setTimeout(() => {
        this.isSequenceVisible = false;
      }, 2000);

    } else {
      this.router.navigate(['/scoring']);  // Navigate to the scoring page if the sequence is invalid
    }
  }

  // Reset the user's sequence
  resetSequence() {
    this.gameService.clearUserSequence();
    this.userSequence = [];
  }
}
