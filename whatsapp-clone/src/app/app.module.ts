import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { SidebarComponent } from './components/main-container/sidebar/sidebar.component';
import { SidebarContentComponent } from './components/main-container/sidebar/sidebar-content/sidebar-content.component';
import { ChatAreaComponent } from './components/main-container/chat-area/chat-area.component';
import { ChatDefaultPageComponent } from './components/main-container/chat-area/chat-default-page/chat-default-page.component';
import { ChatRoomComponent } from './components/main-container/chat-area/chat-room/chat-room.component';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    SidebarComponent,
    SidebarContentComponent,
    ChatAreaComponent,
    ChatDefaultPageComponent,
    ChatRoomComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
