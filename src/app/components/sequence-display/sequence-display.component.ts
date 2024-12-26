import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sequence-display',
  templateUrl: './sequence-display.component.html',
  styleUrls: ['./sequence-display.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class SequenceDisplayComponent {
  sequence: string[] = [];
  buttonColors: string[] = [];
  userSequence: string[] = [];
  isSequenceVisible: boolean = true;
  private intervalId: any;
  activeIndex: number | null = null; // Tracks the current active color index
  currentLevel: number = 1; // Tracks the current game level

  constructor(protected gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.startLevel(1); // Initialize the game at level 1
  }

  startLevel(level: number) {
    this.currentLevel = level;
    this.sequence = this.gameService.getInitialSequence(level);
    this.isSequenceVisible = true;
    this.showSequence();

    setTimeout(() => {
      this.isSequenceVisible = false;
      // Shuffle the sequence for button colors
      this.buttonColors = this.shuffleArray([...this.sequence]);
    }, 15000); // Adjust timeout if necessary
  }

  showSequence(index = 0) {
    if (index < this.sequence.length) {
      this.activeIndex = index; // Highlight the current color
      setTimeout(() => {
        this.activeIndex = null; // Clear the highlight
        this.showSequence(index + 1); // Move to the next color
      }, 1000);
    } else {
      console.log('Sequence display complete for level', this.currentLevel);
    }
  }

  addUserColor(color: string) {
    this.userSequence.push(color);
    this.gameService.addToUserSequence(color);
  }

  validateSequence() {
    const isValid = this.gameService.validateUserSequence();

    console.log('User Sequence:', this.userSequence);
    console.log('Game Sequence:', this.sequence);
    if (isValid) {
      console.log(`Level ${this.currentLevel} passed!`);
      this.resetUserSequence();

      this.currentLevel++;
      this.startLevel(this.currentLevel);
    } else {
      console.log('Game over!');
      this.router.navigate(['/scoring']); // Navigate to scoring on failure
    }
  }

  resetUserSequence() {
    this.userSequence = [];
    this.gameService.clearUserSequence();
  }

  resetSequence() {
    this.resetUserSequence();
  }

  // Utility method to shuffle an array
  shuffleArray(array: string[]): string[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
