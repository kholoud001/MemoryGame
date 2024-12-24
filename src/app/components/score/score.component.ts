import { Component } from '@angular/core';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  standalone: true,
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  score: string | undefined;

  protected readonly status = status;
  level: string | undefined;
}
