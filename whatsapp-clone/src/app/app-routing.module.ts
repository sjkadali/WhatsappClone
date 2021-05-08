import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { ChatRoomComponent } from './components/main-container/chat-area/chat-room/chat-room.component';
import { ChatDefaultPageComponent } from './components/main-container/chat-area/chat-default-page/chat-default-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'room/:id',
        component: ChatRoomComponent
      },
      {
        path: '',
        component: ChatDefaultPageComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot( routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
