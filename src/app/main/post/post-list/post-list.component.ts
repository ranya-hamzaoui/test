import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/core/models';
import { LikeService } from 'src/app/shared/services/like.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts!:Post[]
  @Input('comments') comments:any[]=[] 
  @Input() loading :boolean = false ; 
  @Output('changePost') changePost = new EventEmitter<boolean>()
  closeResult = '';
  
  selectedPostId !:any
  postObj: Post = {
    _id: '',
    content: '',
    title: '',
    user: {} as any,
    photo: '',
    createdAt: '',
    description: ''
  };
  postLikers: any;
  noMore: boolean =false;

  constructor(

    private postService: PostService,
    private modalService: NgbModal,
    private likeService: LikeService,
    private toastService:ToastrService
  ) { }

  ngOnInit(): void {
    this.loading = false;
  }
  

   onDelete(post: Post): void {
      this.selectedPostId = post._id;
      this.postService.deletePost(this.selectedPostId).subscribe({
        next: () => this.toastService.success('Post deleted successfully'),
        error: (err) => this.toastService.error('Failed to delete post')
      });
    }

   onEdit(post: Post): void {
    this.postObj = { ...post };
   }
  updatePost() : void  {
    this.postService.updatePost(this.postObj._id,this.postObj).
    subscribe((resp:any) => {
      this.toastService.success('Post changed ssuccefuly')
    }, 
    (err:any)=>{
      this.toastService.error('Failed to update post')
    })
  }

  handleChange(event:any) : void  {
  console.log('handle changement from createComment or listComment')
  this.changePost.emit(true)
  }


   addLike(post:any) : void {
    this.selectedPostId=post._id;
    this.likeService.addLike(this.selectedPostId).subscribe((res:any)=>{
        this.changePost.emit(true)
    })   
    }

    removeLike(post:any) : void {
      this.selectedPostId=post._id;
      this.likeService.removeLike(this.selectedPostId).subscribe((res:any)=>{
        this.changePost.emit(true)
       },err=>{
           console.log('err',err)
           this.changePost.emit(true)
    })   
    }

  toggleLike(post:any): void {
    (post.likedByMe) ? this.removeLike(post) : this.addLike(post)
  }

  openLike(content:any,post:Post) : void{
    this.selectedPostId=post._id
    this.getLikesByPost()
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content:any) : void {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
      }

    private getLikesByPost(): void {
      this.likeService.getLikes(this.selectedPostId).subscribe({
        next: (response: any) => {
          console.log('postLikers', response[0]?.users_likes)
          this.postLikers = response[0]?.users_likes
        },
        error: (err) => console.error('Error fetching likes', err)
      });
    }

}


