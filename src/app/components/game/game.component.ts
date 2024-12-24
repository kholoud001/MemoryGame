import { Component } from '@angular/core';
import {sequence} from '@angular/animations';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-game',
  imports: [
    NgClass
  ],
    templateUrl: './game.component.html',
    standalone: true,
    styleUrl: './game.component.css'
})
export class GameComponent {

  protected readonly sequence = sequence;
}
