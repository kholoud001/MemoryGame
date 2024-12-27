import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-sequence-display',
  templateUrl: './sequence-display.component.html',
  styleUrls: ['./sequence-display.component.css'],
  imports: [CommonModule],
  standalone: true,
  animations: [
    trigger('blink', [
      state('inactive', style({
        opacity: 1
      })),
      state('active', style({
        opacity: 0.5
      })),
      transition('inactive => active', [
        animate('0.5s ease-in-out')
      ]),
      transition('active => inactive', [
        animate('0.5s ease-in-out')
      ])
    ]),
    trigger('buttonClick', [
      state('inactive', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('active', style({
        transform: 'scale(1.2)',
        opacity: 0.8
      })),
      transition('inactive => active', [
        animate('0.2s ease-in')
      ]),
      transition('active => inactive', [
        animate('0.2s ease-out')
      ])
    ])
  ],
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
  activeState: 'inactive' | 'active' = 'inactive';
  buttonState: 'inactive' | 'active' = 'inactive';

  onButtonClick() {
    this.buttonState = this.buttonState === 'inactive' ? 'active' : 'inactive';
  }



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
      this.activeState = 'active';
      setTimeout(() => {
        this.activeState = 'inactive';
        setTimeout(() => this.showSequence(index + 1), 300);
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
    //this.startLevel(1);
    this.gameService.resetGame();
    this.router.navigate(['']);
  }


  shuffleArray(array: string[]): string[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  startTimer() {
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
