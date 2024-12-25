import { Routes } from '@angular/router';
import {GameComponent} from './components/game/game.component';
import { SequenceDisplayComponent } from './components/sequence-display/sequence-display.component';
import {ScoreComponent} from './components/score/score.component';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'sequence-display', component: SequenceDisplayComponent },
  { path: 'scoring', component: ScoreComponent }

];
