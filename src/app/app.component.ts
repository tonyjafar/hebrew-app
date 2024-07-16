import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { randomSlice } from '../words_functions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hebrew-app';
  wordsDic = randomSlice;
  
}
