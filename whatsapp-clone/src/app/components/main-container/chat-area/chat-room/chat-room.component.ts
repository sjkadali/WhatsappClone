import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase/app';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  isUser: User;
  item;
  messageData: any[] = [];

@Output() chatData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private afs: AngularFirestore) {
    this.isUser =JSON.parse(localStorage.getItem('user'));           
  }
  
  ngOnInit(): void {
    this.subs.push(this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id'))
      )
      .subscribe(routePathParam => this.commonService.updatePathParamState(routePathParam)));
  
    this.subs.push(
      this.route.params.subscribe(par => {
        this.afs.collection('rooms').doc(par.id).get().subscribe(data => {
          this.item = data;
          this.chatData.emit(this.item.data().name);
        });

        // This is to reverse the message order, with the latest on top
        this.subs.push(this.afs.collection('rooms').doc(par.id)
          .collection('messages', ref => ref.orderBy('time', 'asc'))
          .valueChanges()
          .subscribe(messages =>{
            this.messageData = messages;
          }));
      })
    );  
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

}
