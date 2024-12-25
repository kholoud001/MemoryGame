import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private sequence: string[] = [];
  private userSequence: string[] = [];
  private colors: string[] = [];

  constructor() {
    this.generateColors();
  }

  // Générer des couleurs hexadécimales uniques
  private generateColors() {
    while (this.colors.length < 4) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      if (!this.colors.includes(color)) {
        this.colors.push(color);
      }
    }
  }
  generateSequence() {
    while (this.sequence.length < 2) {
      const newColor = this.getRandomColor();
      if (!this.sequence.includes(newColor)) {
        this.sequence.push(newColor);
      }
    }
    return this.sequence;
  }

  // Récupérer une couleur aléatoire
  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  // Ajouter une seule couleur unique à la séquence
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

  // addColor1() {
  //   return this.generateSequence();
  // }

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
