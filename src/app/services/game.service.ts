import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private sequence: string[] = [];
  private userSequence: string[] = [];
  private colors: string[] = [];
  private score: number = 0;
  private level: number = 1;
  private startTime: number = 0;

  constructor() {
    this.generateColors();
  }

  /**
   * Generate a fixed set of unique HEX colors.
   */
  private generateColors() {
    while (this.colors.length < 4) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      if (!this.colors.includes(color)) {
        this.colors.push(color);
      }
    }
  }

  /**
   * Generates the initial sequence of colors for the level.
   * @param level Current game level.
   * @returns Sequence of colors.
   */
  getInitialSequence(level: number): string[] {
    this.sequence = [];
    while (this.sequence.length < 2 + (level - 1)) {
      const newColor = this.getRandomColor();
      this.sequence.push(newColor);
    }
    return [...this.sequence]; // Return a copy of the sequence
  }

  // // Generate the initial sequence
  // generateSequence() {
  //   this.sequence = [];
  //   while (this.sequence.length < this.level + 1) {
  //     const newColor = this.getRandomColor();
  //     if (!this.sequence.includes(newColor)) {
  //       this.sequence.push(newColor);
  //     }
  //   }
  //   return this.sequence;
  // }

  setSequence(sequence: string[]) {
    this.sequence = sequence;
  }


  /**
   * Randomly shuffles the current sequence for button display.
   * @returns Shuffled sequence of colors.
   */
  generateButtonColors(): string[] {
    return [...this.sequence].sort(() => Math.random() - 0.5);
  }

  /**
   * Retrieves a random color from the predefined set of colors.
   * @returns A single HEX color.
   */
  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  /**
   * Adds a color to the user's sequence during gameplay.
   * @param color Color clicked by the user.
   */
  addToUserSequence(color: string) {
    this.userSequence.push(color);
  }

  /**
   * Validates the user's sequence against the generated sequence.
   * @returns `true` if the sequences match, `false` otherwise.
   */
  validateUserSequence(): boolean {
    const isValid = this.userSequence.join('') === this.sequence.join('');
    if (isValid) {
      this.calculateScore();
      this.levelUp();
    }
    return isValid;
  }

  /**
   * Clears the user's sequence.
   */
  clearUserSequence() {
    this.userSequence = [];
  }

  /**
   * Levels up the game and generates a new sequence.
   */
  levelUp() {
    this.level++;
    this.getInitialSequence(this.level);
  }



  /**
   * Calculates the score based on elapsed time and accuracy.
   */
  calculateScore() {
    const elapsedTime = Date.now() - this.startTime; // Elapsed time in ms
    const timeScore = Math.max(0, 1000 - elapsedTime / 10); // Faster time = higher score
    const accuracyScore = 100; // Full accuracy score
    this.score += Math.floor(timeScore + accuracyScore);
  }

  /**
   * Retrieves the current score.
   * @returns The score.
   */
  getScore(): number {
    return this.score;
  }

  /**
   * Retrieves the current level.
   * @returns The level.
   */
  getLevel(): number {
    return this.level;
  }

  /**
   * Starts the timer for calculating elapsed time.
   */
  startTimer() {
    this.startTime = Date.now();
  }

  /**
   * Resets the game state.
   */
  resetGame() {
    this.sequence = [];
    this.userSequence = [];
    this.score = 0;
    this.level = 1;
  }
}
