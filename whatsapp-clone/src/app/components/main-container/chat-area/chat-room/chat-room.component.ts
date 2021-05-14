import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  subs: Subscription;

  constructor(private commonService: CommonService,
              private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.subs =this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id'))
      )
      .subscribe(routePathParam => this.commonService.updatePathParamState(routePathParam));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
