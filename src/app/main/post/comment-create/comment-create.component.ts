import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/shared/services/comment.service';
import { Post, User } from 'src/app/core/models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css'],
})
export class CommentCreateComponent implements OnInit {
  @Input('post') post!: Post;
  @Output('createComment') createComment = new EventEmitter<boolean>();
  text: string = '';
  user!: User;
  urlImage = environment.baseurl + '/getImageFile';

  constructor(
    private commentService: CommentService,
    private toastService: ToastrService,
    private userServ : AuthService
  ) {}
  ngOnInit(): void {
    this.user = this.userServ.getCurrentUser()
  }

  addComment(): void {
    if (!this.text.trim()) {
      this.toastService.error('Please provide a comment');
      return;
    }

    const commentData = {
      post: this.post._id,
      text: this.text,
    };

    this.commentService.addComment(commentData).subscribe({
      next: () => {
        this.createComment.emit(true);
        this.toastService.success('Comment Added with Succefuly');
        this.text = '';
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      },
    });
  }
}
