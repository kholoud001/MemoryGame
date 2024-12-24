import { Component } from '@angular/core';
import {GameComponent} from './components/game/game.component';
import {InterfaceComponent} from './components/interface/interface.component';
import {ScoreComponent} from './components/score/score.component';

//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ GameComponent , InterfaceComponent, ScoreComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MemoryGame';
}
