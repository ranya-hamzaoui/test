import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  userId= JSON.parse(localStorage.getItem('currentUser')!)._id ;

  constructor() {
    this.socket = io(environment.webSocketurl, {

      query: {
        token: 'your_token_here',
        userId: this.userId
      },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 20000,
    });
  } 
  joinRoom(idRoom : string): void {
		this.socket.emit('subscribe', idRoom);
	}
  sendMessage(event : string, message: any) {
    this.socket.emit(event, JSON.stringify(message));
  }
  onMessage(event : string) {
    return new Observable(observer => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }
}
