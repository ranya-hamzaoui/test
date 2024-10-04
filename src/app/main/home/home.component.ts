import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { PostService } from 'src/app/shared/services/post.service';
import { TEXT } from '../../shared/constants/text';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  TEXT = TEXT;
  posts: any[] = [];
  pager = {
    currentPage: 1,
    totalPages: 0,
    pages : []
  };
  codePage: string = '';
  private unsubscribe$ = new Subject<void>();
  constructor(private postservice: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.codePage = data['code']
      if (data['code'] =='All_Posts')  this.getPosts(1);
      else if (data['code'] =='My_Posts')  this.getMyPosts(1);
      else 
      this.getFollowingPosts(1)
    });

   
  }

  setpage(page : any){
    switch (this.codePage) {
      case 'All_Posts':
      this.getPosts(page)
      break;
      case 'My_Posts':
      this.getMyPosts(page)
      break;
      default:
      this.getFollowingPosts(page)
      break;
    }
  }
  setConfigPage(resp : any){
    this.pager['pages'] = [];
    this.pager["currentPage"] = Number(resp["currentPage"]);
    this.pager["totalPages"] = Number(resp["totals"]);
    for (let i = 0; i < resp['totals']; i++) {
      this.pager['pages'].push((i + 1)as never)
    }
  }
  getMyPosts(p:any) {
    this.postservice
      .getMyPostsByLike(p)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (resp: any) => {
          this.posts = resp['result'];
          this.setConfigPage(resp);
        },
        (err) => {
          console.log('error', err);
        }
      );
  }
  getPosts(p : any) {
    this.postservice
      .getPostsByLike(p)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (resp: any) => {
          this.posts = resp['result'];
          this.setConfigPage(resp);
        },
        (err) => {
          console.log('error', err);
        }
      );
  }
  getFollowingPosts(p : any) {
    this.postservice
      .getFollowsPosts(p)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (resp: any) => {
          this.posts = resp['posts'];
          this.setConfigPage(resp);
        },
        (err) => {
          console.log('error', err);
        }
      );
  }
  handleChange(event: boolean): void {
    // this.getPosts(1);
    this.setpage(1)
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
