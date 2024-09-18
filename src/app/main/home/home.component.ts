import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { PostService } from 'src/app/shared/services/post.service';
import { TEXT } from '../../shared/constants/text';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  TEXT = TEXT;
  posts: any[] = [];
  page!: number;
  private unsubscribe$ = new Subject<void>();
  constructor(private postservice: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postservice
      .getPostsByLike(this.page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (resp: any) => {
          this.posts = resp;
        },
        (err) => {
          console.log('error', err);
        }
      );
  }

  handleChange(event: boolean): void {
    // Refresh posts when the event is triggered
    this.getPosts();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
