import { Component } from '@angular/core';
import {GameComponent} from './components/game/game.component';
import {ScoreComponent} from './components/score/score.component';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MemoryGame';

}
