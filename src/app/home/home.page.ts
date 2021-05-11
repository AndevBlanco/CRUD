import { Component, OnInit } from '@angular/core';
import { ContactI } from "../models/contact.interface";
import { ContactServiceService } from "../services/Contact/contact-service.service";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  allContacts: Array<ContactI>;

  constructor(
    private contactService: ContactServiceService,
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe(success => {
      this.allContacts = success;
      console.log(success);
    });
  }

}
