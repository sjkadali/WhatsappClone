import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService, RoomData } from 'src/app/services/common.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  randomSeed: any[] = [];
  roomData: RoomData[] = [];
  lastMessage: string;
  subs: Subscription[] = [];

  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();


  constructor(private afs: AngularFirestore,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.randomSeed = Array.from({length: 20}, () => Math.floor(Math.random() * 145678));
  
    this.subs.push(this.afs.collection('rooms').snapshotChanges()
      .pipe(
        map( actions => {
          return actions.map( a => {
            return {
              id: a.payload.doc.id,
              // @ts-ignore
              ...a.payload.doc.data()
            }            
          })
        })
      ).subscribe((rooms: RoomData[]) => {
        this.roomData = rooms;
        console.log(this.roomData);
      }));
  }

  onFormSubmit(form: NgForm):void {
    console.log(form.value.search);
  }

  ngOnDestroy():void {
    this.subs.map(s => s.unsubscribe());
  }

  seedData(ev: string):void {
    this.seedValue.emit(ev);
  }

  logout():void {
    this.commonService.logout();
  }

}
