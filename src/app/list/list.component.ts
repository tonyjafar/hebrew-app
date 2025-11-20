import { Component } from '@angular/core';
import { words } from '../../words';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
    selector: 'app-list',
    imports: [NgxPaginationModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export class ListComponent {
  wordList = words;
  p: any;
}
