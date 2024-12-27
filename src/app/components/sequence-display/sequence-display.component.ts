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
  activeIndex: number | null = null;
  currentLevel: number = 1;
  timer = 15;
  interval: any;


  constructor(protected gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.startLevel(1);
    this.startTimer();
  }

  startLevel(level: number) {
    this.currentLevel = level;
    this.sequence = this.gameService.getInitialSequence(level);
    this.isSequenceVisible = true;
    this.timer = 15;
    this.startTimer(); 
    this.showSequence();


    setTimeout(() => {
      this.isSequenceVisible = false;
      // Shuffle the sequence for button colors
      this.buttonColors = this.shuffleArray([...this.sequence]);
    }, 15000);
  }

  showSequence(index = 0) {
    if (index < this.sequence.length) {
      this.activeIndex = index;
      setTimeout(() => {
        this.activeIndex = null;
        this.showSequence(index + 1);
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
      this.router.navigate(['/scoring']);
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

  startTimer() {
    // Clear any existing interval to avoid multiple timers
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval); // Stop the timer when it reaches 0
        this.isSequenceVisible = false; // Transition to the next phase
      }
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
