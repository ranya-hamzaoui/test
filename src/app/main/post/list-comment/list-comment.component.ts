import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/core/models';
import { CommentService } from 'src/app/shared/services/comment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css'],
})
export class ListCommentComponent implements OnInit {
  @Input('comments') comments!: Comment[];
  @Output('deleteComment') deleteComment = new EventEmitter<any>();

  formValue!: FormGroup;
  CommentObj!: Comment;

  initialItems = 3;
  displayedItems = this.initialItems;
  urlImage = environment.baseurl + '/getImageFile';
  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      content: [''],
      image: '',
    });
  }
  onDelete(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.deleteComment.emit(true);
      },
      error: (err) => console.error('Error deleting comment:', err),
    });
  }

  showMore(): void {
    this.displayedItems += 5; 
  }
  
  showLess(): void {
    this.displayedItems = this.initialItems; 
  }
  getComment(): void {
    this.commentService.getCommentByPost().subscribe({
      next: (comments: Comment[]) => (this.comments = comments),
      error: (err) => console.error('Error fetching comments:', err),
    });
  }
}
