
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { words } from '../words';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true
})
export class AppComponent {
  count = words.length

}
