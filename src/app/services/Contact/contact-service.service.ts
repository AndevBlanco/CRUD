import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ContactI } from "../../../app/models/contact.interface";

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private contactsCollections: AngularFirestoreCollection<ContactI>;
  private allContacts: Observable<ContactI[]>;

  constructor(db: AngularFirestore) { 
    this.contactsCollections = db.collection<ContactI>('contacts');
    this.allContacts = this.contactsCollections.snapshotChanges().pipe(map( actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getContacts() {
    return this.allContacts;
  }

  getContact(id: string) {
    return this.contactsCollections.doc<ContactI>(id).valueChanges();
  }

  updateContact(contact: ContactI, id: string) {
    return this.contactsCollections.doc(id).update(contact);
  }

  addContact(contact: ContactI) {
    return this.contactsCollections.add(contact);
  }

  removeContact(id: string) {
    return this.contactsCollections.doc(id).delete();
  }

}
