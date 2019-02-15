import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public gifts;
    documentToDomainObject = _ => {
        const object = _.payload.doc.data();
        object.id = _.payload.doc.id;
        return object;
    }

    constructor(public db: AngularFirestore) {
        this.gifts = db.collection('gifts').snapshotChanges()
            .pipe(map(gifts => gifts.map(this.documentToDomainObject)));
    }

    public redeem(gift: any) {
        const giftDoc = this.db.doc(`/gifts/${gift.id}`);
        gift.redeemDate = new Date();
        giftDoc.update(gift);
    }

    public convertTimestamp(timeStamp: any) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        return new Date(timeStamp.seconds * 1000);
    }

}
