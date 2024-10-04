import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';
import { Subscription } from 'rxjs';
import { chatService } from 'src/app/shared/services/chat.service';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls : ['./chat.component.scss']
})

export class ChatComponent implements OnInit,OnDestroy {
  message: string = '';
  messages: string[] = [];
	public roomId!: string;
	public messageText!: string;
	public messageArray: { sender: any, text: string }[] = [];
	public currentUser! : any;
	public selectedUser! : any;
	public userList : User[] = [];
  private messageSubscription!: Subscription;
  pager = {
    currentPage: 0,
    totalPages: 0,
    pages : []
  };
  public filteredUserList: User[] = [];
  public searchText: string = '';
	constructor(
		private chatService: chatService,
    private socketService: SocketService,
    private userServ: UserService
	) {}

	ngOnInit(): void {
		this.initial()
		this.messageSubscription =  this.socketService.onMessage('get_message').subscribe((data: any) => {
			if  (this.roomId == data.room_id){
      this.messageArray.push({sender: this.selectedUser,text:`${data.message}`});
			}
		});
	}

	initial(){
		  this.currentUser = JSON.parse(<string>localStorage.getItem("currentUser"));
    	this.chatService.getAllRooms(1).subscribe((resp : any) => {
			this.userList = resp['data']['chats'];	
		})
	}
  selectUserHandler(_id: any): void {
		this.selectedUser = this.userList.find(user => user._id === _id);
    this.initRoom(1)
		this.join(this.roomId);
	}

  initRoom(page:any){
		this.messageArray = [];
    this.chatService.InitiateRoom(this.selectedUser._id, page).subscribe((resp : any) => {
      this.roomId = resp['data']['room']['_id']
      let msgsConversation = resp['data']['room']['messages'];
      this.pager['pages'] = [];
      this.pager["currentPage"] = Number(resp['data']["current_page"]);
      this.pager["totalPages"] = Number(resp['data']["total_pages"]);
      for (let i = 0; i < resp['data']['total_pages']; i++) {
        this.pager['pages'].push((i + 1)as never)
      }
      this.messageArray = msgsConversation;
  })
  }
	join(roomId: string): void {
		this.socketService.joinRoom(roomId);
	}
  setpage(p: number) {
    this.initRoom(p)
  }
  sendMessage() {
    let dataToSend = {
			message: this.messageText,
      room_id : this.roomId
    }
    if (this.messageText.trim()) {
      this.socketService.sendMessage('new_message',dataToSend);
      this.initRoom( this.pager["currentPage"])
      // this.messageArray.push({sender: this.currentUser,text:`${this.messageText}`});
      this.messageText = '';
    }
  }
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  filterNewUsers() {
    this.userServ.getUsers().subscribe((res : any)=> {
      this.userList = res['data']['users'].filter((user:any) => 
        !user.name.toLowerCase().includes(this.currentUser.name.toLowerCase())
         &&  user.name.toLowerCase().includes(this.searchText.toLowerCase())
        //  && !user.hasChatRoom
      );
    })
  }
}