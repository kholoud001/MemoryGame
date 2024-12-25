import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private sequence: string[] = [];
  private userSequence: string[] = [];
  private colors: string[] = [];
  level: number = 1;


  constructor() {
    this.generateColors();
    this.generateSequence();
  }

  private generateColors() {
    while (this.colors.length < 4) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      if (!this.colors.includes(color)) {
        this.colors.push(color);
      }
    }
  }

  generateSequence1() {
    while (this.sequence.length < 2) {
      const newColor = this.getRandomColor();
      if (!this.sequence.includes(newColor)) {
        this.sequence.push(newColor);
      }
    }
    return this.sequence;
  }

  // // Generate the initial sequence
  generateSequence() {
    this.sequence = [];
    while (this.sequence.length < this.level + 1) {
      const newColor = this.getRandomColor();
      if (!this.sequence.includes(newColor)) {
        this.sequence.push(newColor);
      }
    }
    return this.sequence;
  }

  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  addColor() {
    const newColor = this.getRandomColor();
    if (!this.sequence.includes(newColor)) {
      this.sequence.push(newColor);
    }
    return this.sequence;
  }

  getSequence() {
    return this.sequence;
  }

  resetGame() {
    this.sequence = [];
    this.userSequence = [];
  }

  addToUserSequence(color: string) {
    this.userSequence.push(color);
  }

  validateUserSequence(): boolean {
    console.log('User Sequence:', this.userSequence);
    console.log('Game Sequence:', this.sequence);
    return this.userSequence.join('') === this.sequence.join('');
  }


  generateButtonColors(): string[] {
    return [...this.sequence].sort(() => Math.random() - 0.5);
  }

  clearUserSequence() {
    this.userSequence = [];
  }

  levelUp() {
    this.level += 1;  // Increase the level
    this.generateSequence();
  }
}
