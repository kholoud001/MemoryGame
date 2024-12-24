import { Component } from '@angular/core';
import { GameService} from '../../services/game.service';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-sequence-display',
  standalone: true,
  templateUrl: './sequence-display.component.html',
  styleUrls: ['./sequence-display.component.css'],
  imports: [
    NgClass,
    NgForOf
  ]
})
export class SequenceDisplayComponent {

  sequence: string[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // this.gameService.generateSequence();
    this.sequence = this.gameService.getSequence();
    this.showSequence();
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
    console.log('Highlighting:', color);

    const colorBox = document.querySelector(`.${color}`);

    if (colorBox) {
      colorBox.classList.add('highlight');

      setTimeout(() => {
        colorBox.classList.remove('highlight');
      }, 1000);
    }
  }

}
