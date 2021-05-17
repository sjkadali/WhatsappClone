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
    const {search} =form.value;
    
    this.subs.push(this.afs.collection<RoomData>('rooms')
    .valueChanges()
    .pipe(
      map((data: RoomData[]) => data.map(s => s.name?.toLowerCase() === search.toLowerCase()))
    ).subscribe(
      dataValue => {
        dataValue = dataValue.filter(s => s === true);
        if (dataValue.length > 0) {
          alert(dataValue+ ', Sorry , the room already exists');
          return;
        } else {
          if (search !== null && search !== '') {
            this.afs.collection('rooms').add({
              name: search
            });
          } else {
            return;
          }
        }
      }
    ));
    form.resetForm();
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
