import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  standalone: true,
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  score: number = 0;

  constructor(private gameService:GameService,private router:Router) {
  }

  ngOnInit() {
    this.score = Math.floor(Math.random() * 100);
  }

  goHome() {
    this.gameService.resetGame();
    this.router.navigate(['']);

  }
}
