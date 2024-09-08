import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  setTitle(title: string) {
    this.title.setTitle(title);
  }
  setMeta(description?: string, keywords?: string) {
    this.meta.addTags([
      { name: 'description', content: description! },
      { name: 'keywords', content: keywords! },
    ]);
  }
}
