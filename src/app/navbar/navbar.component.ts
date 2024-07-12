import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: any;
  showNavbar: any;
  response: any;

  constructor(private userService: UserService, private router: Router,private chatService: ChatService) { }

  ngOnInit() {
    // subscribe to router events observable and manage routes 
    this.router.events.subscribe((data: any) => {
      // if user data in local storage, assume user logged in
      if (localStorage.getItem('username') && localStorage.getItem('userid')) {
        // update boolean variable to show navbar
        this.showNavbar = true;
        this.username = JSON.parse(localStorage.getItem('username') || '');
        this.chatService.emitChatEvent(true);
        this.chatService.emitSupportEvent(false);
      }
      else {
        // update boolean variable to hide navbar
        this.showNavbar = false;
        this.chatService.emitChatEvent(true);
        this.chatService.emitSupportEvent(true);
      }
    })
  }

  async logOut() {
    // call logout API
    const response = await this.userService.logout();

    // if logout successful, hide navbar, clear local storage and go to login
    if (response.success) {
      this.showNavbar = false;
      localStorage.clear();
      this.router.navigate(['login']);
    }
    else {
      alert('Error while logging out');
    }
  }

}
