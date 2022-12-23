import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, term: string): SafeHtml {
    if (!term || !text) {
      return text;
    }

    // Split the term into individual words
    const terms = term.split(' ');

    // Iterate over each word and wrap it in a highlight span
    for (const t of terms) {
      text = text.replace(new RegExp(t, 'im'), `<mark>$&</mark>`);
    }

    // Sanitize the modified HTML and return it as a safe value
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
