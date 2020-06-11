import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { Conversacion } from "../entities/conversacion";
import { ChatService } from "../services/chat-service.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

  user: UserApp;
  conversaciones: Conversacion[];
  conversacionActive: Conversacion;
  conversacionActiveID: number;

  constructor(public currentUser: CurrentUserService, public chatService: ChatService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.chatService.getChat("715891@unizar.es").subscribe(data => {
      this.conversaciones = <Conversacion[]>data;
    });
    this.conversaciones[0].active = 'active';
    this.changeConversacion(0);
  }

  createChat() {
    this.chatService.addChat("Entrada", "Usuario","entradaexample@gmail.com",
        "715891@unizar.es").subscribe(data => {
      this.conversaciones.push(<Conversacion>data);
    })
  }

  public changeConversacion(i: number) {
    for (let conversacion of this.conversaciones) {
      conversacion.active = '';
    }
    this.conversaciones[i].active = 'active';
    this.conversacionActive = this.conversaciones[i];
    this.conversacionActiveID = i;
  }

  public addMessage() {
    let newMessage = {
      texto: $('#text').text(),
      emisor: 'user',
      hora: new Date(Date.now())
    }
    this.conversaciones[this.conversacionActiveID].mensajes.push(newMessage);
    this.chatService.updateChatEntry(this.conversaciones[this.conversacionActiveID]).subscribe(data => {
      console.log(data);
    });
    this.changeConversacion(this.conversacionActiveID);
  }

}
