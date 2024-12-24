import { Component } from '@angular/core';
import {colors} from '@angular/cli/src/utilities/color';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-interface',
  imports: [
    NgClass
  ],
  templateUrl: './interface.component.html',
  standalone: true,
  styleUrl: './interface.component.css'
})
export class InterfaceComponent {

  protected readonly colors = colors;
  private _color: any;

  selectColor(color: any) {
    this._color = color;

  }

  validateSequence() {

  }

  resetSequence() {

  }
}
