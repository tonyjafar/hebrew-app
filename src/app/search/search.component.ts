import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {getSearchedWords} from '../../words_functions'

import {Words} from '../../words'

@Component({
    selector: 'app-search',
    imports: [],
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './search.component.css'
})
export class SearchComponent {
  public paramKeys: string[] = [];
  public params: string | null = null;
  public findWord: Words[] = [];
  public relatedWord: Words[] = [];
  public wordsCount = 0;
  public relatedCount = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      this.paramKeys = params.keys;
      this.params = params.get('word');
      this.updateSearchResults();
    });
  }

  private updateSearchResults(): void {
    if (this.params !== null && this.params.trim() !== '') {
      [this.findWord, this.relatedWord] = getSearchedWords(this.params);
    } else {
      this.findWord = [];
      this.relatedWord = [];
    }

    this.wordsCount = this.findWord.length;
    this.relatedCount = this.relatedWord.length;
  }
}





