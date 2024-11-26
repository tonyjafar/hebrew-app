import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {getSearchedWords} from '../../words_functions'
import { CommonModule } from '@angular/common';
import {Words} from '../../words'

@Component({
    selector: 'app-search',
    imports: [CommonModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {
  public paramKeys: any;
  public params: any;
  public findWord: Words[] = [];
  public relatedWord: Words[] = [];
  public wordsCount: any;
  public relatedCount: any;
  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap
      .subscribe((p:any) => {
        this.params = p['params'][p.keys];
        this.paramKeys = p.keys;
      }
    );
    if (this.params !== undefined) {
    [this.findWord, this.relatedWord] = getSearchedWords(this.params);
  } else{
    this.findWord = [];
  }
  this.wordsCount = this.findWord.length;
  this.relatedCount = this.relatedWord.length;
  }

}





