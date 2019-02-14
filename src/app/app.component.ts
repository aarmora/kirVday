import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public gifts;
    public mainDescription;

    constructor(db: AngularFirestore) {
        this.gifts = db.collection('gifts').valueChanges();
    }

}
