import { Component, OnInit } from '@angular/core';
import { ContactI } from "../../models/contact.interface";
import { ContactServiceService } from "../../services/Contact/contact-service.service";
import { ActivatedRoute } from "@angular/router";
import { NavController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {

  contact: ContactI = {
    name: '',
    lastName: '',
    phone: '',
  };

  contactId: any = null;

  constructor(
    private serviceContact: ContactServiceService,
    private route: ActivatedRoute,
    private nav: NavController,
    private load: LoadingController,
  ) { }

  ngOnInit() {
    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId) {
      this.loadContact();
    }
  }

  async loadContact() {
    const loading = await this.load.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.serviceContact.getContact(this.contactId).subscribe(success => {
      loading.dismiss();
      this.contact = success;
    });
  }

  async saveContact() {
    const loading = await this.load.create({
      message: 'Cargando...'
    });
    await loading.present();
    if (this.contactId) {
      //Update
      this.serviceContact.updateContact(this.contact, this.contactId).then( () => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      //Create
      this.serviceContact.addContact(this.contact).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  onRemove(contactId: string) {
    this.serviceContact.removeContact(contactId);
  }

}
