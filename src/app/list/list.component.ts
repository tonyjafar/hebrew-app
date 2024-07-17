import { Component } from '@angular/core';
import { words } from '../../words';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';





const totalItems = words.length;
const pageSize = 20;
let currentPage = 0;

let items = words.slice(currentPage - 1, pageSize);
export function pageChanged(event: any) {
  currentPage = event.page;
  items = words.slice(currentPage - 1, pageSize);
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  wordList = words;
  currentPage = currentPage;
  pageChanged = pageChanged;
  p: any;
}
