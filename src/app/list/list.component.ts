import { Component } from '@angular/core';
import { words } from '../../words';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-list',
    imports: [NgxPaginationModule, CommonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export class ListComponent {
  wordList = words;
  p: any;
}
