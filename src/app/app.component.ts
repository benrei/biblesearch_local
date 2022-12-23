import { Component, OnInit } from '@angular/core';
import lunr from 'lunr';
import verses from './kjv.json';

@Component({
  selector: 'app-root',
  template: `
    <input
      #search
      placeholder="Search..."
      type="search"
      (keyup)="onSearch($event)"
    />
    <ul>
      <li *ngFor="let result of searchResults">
        <b>{{ result.book_name }} {{ result.chapter }}:{{ result.verse }}</b>
        <br />
        <span [innerHTML]="result.text | highlight : search.value"></span>
      </li>
    </ul>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchResults: Verses[];
  index: any;
  searchTimeout: any;

  ngOnInit() {
    // Initialize the Lunr index with the fields that you want to search
    this.index = lunr(function () {
      this.ref('id');
      this.field('text');

      for (const verse of verses as Verses[]) {
        this.add(verse);
      }
      console.timeEnd('verses');
    });
  }

  onSearch(event: KeyboardEvent) {
    // Clear the timeout if it has been set
    clearTimeout(this.searchTimeout);

    // Set a new timeout to debounce the search
    this.searchTimeout = setTimeout(() => {
      const element = event.target as HTMLInputElement;
      const term = element.value;
      if (term.length < 3) return;
      const result = this.index.search(term);

      this.searchResults = result.map((item) => {
        return (verses as Verses[]).find(
          (verse) => Number(item.ref) === verse.id
        );
      });
    }, 300); // debounce for 300ms
  }
}
export interface Verses {
  id: number;
  book_id: string;
  book_name: string;
  chapter: number;
  text: string;
  verse: number;
}
