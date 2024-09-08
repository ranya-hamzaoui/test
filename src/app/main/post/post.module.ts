import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { ListCommentComponent } from './list-comment/list-comment.component';

@NgModule({
  declarations: [PostListComponent, PostCreateComponent,
    CommentCreateComponent,ListCommentComponent
    ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [PostCreateComponent, PostListComponent],
})
export class PostModule {}
