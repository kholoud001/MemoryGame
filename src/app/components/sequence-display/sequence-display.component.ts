import { Component } from '@angular/core';
import { GameService} from '../../services/game.service';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-sequence-display',
  standalone: true,
  templateUrl: './sequence-display.component.html',
  styleUrls: ['./sequence-display.component.css'],
  imports: [
    NgForOf,
    NgStyle,
    NgIf
  ]
})
export class SequenceDisplayComponent {

  sequence: string[] = [];
  isSequenceVisible: boolean = true;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // Génère la séquence au début
    this.gameService.generateSequence();
    this.sequence = this.gameService.getSequence();

    // Affiche la séquence pendant 15 secondes
    this.showSequence();
    setTimeout(() => {
      this.isSequenceVisible = false; // Cache la séquence après 15 secondes
    }, 15000);
  }

  showSequence() {
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

  highlightColor(color: string) {
    const index = this.sequence.indexOf(color);
    const element = document.querySelectorAll('.color-box')[index];

    if (element) {
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 500); // Durée de l'animation (0.5s)
    }
  }


}
