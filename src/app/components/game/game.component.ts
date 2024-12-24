import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import {GameService} from '../../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [],
})

export class GameComponent {
  constructor(private router: Router, private gameService: GameService) {
  }

  startGame() {
    this.gameService.generateSequence(); // Generate a new sequence
    this.router.navigate(['/sequence-display']);
  }
}
