import { Component } from '@angular/core';
import { GameService} from '../../services/game.service';
import {NgClass, NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-sequence-display',
  standalone: true,
  templateUrl: './sequence-display.component.html',
  styleUrls: ['./sequence-display.component.css'],
  imports: [
    NgClass,
    NgForOf,
    NgStyle
  ]
})
export class SequenceDisplayComponent {

  sequence: string[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.generateSequence();
    this.sequence = this.gameService.getSequence();
    this.showSequence();

    console.log(this.gameService.generateSequence()); // Deux couleurs aléatoires
    console.log(this.gameService.addColor());         // Ajout d'une nouvelle couleur
    console.log(this.gameService.getSequence());      // Affichage de la séquence
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
