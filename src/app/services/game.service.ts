import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private sequence: string[] = [];
  private userSequence: string[] = [];
  private colors = ['red', 'blue', 'green', 'yellow'];

  constructor() {}

  generateSequence() {
    for (let i = 0; i < 2; i++) {
      const newColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.sequence.push(newColor);
    }
    return this.sequence;
  }

  getSequence() {
    return this.sequence;
  }

  addColor() {
    return this.generateSequence();
  }

  resetGame() {
    this.sequence = [];
    this.userSequence = [];
  }

  addToUserSequence(color: string) {
    this.userSequence.push(color);
  }

  validateUserSequence(): boolean {
    return this.userSequence.join('') === this.sequence.join('');
  }
}
