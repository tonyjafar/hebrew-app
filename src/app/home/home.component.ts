import { Component } from '@angular/core';
import { randomSlice } from '../../words_functions';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  wordsDic = randomSlice;

}
