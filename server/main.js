import { Meteor } from 'meteor/meteor';
import { Galleries } from '../imports/api/galleries.js';
import { GallerySearchResponses } from '../imports/api/gallerySearchResponses.js';
import { Photos } from '../imports/api/photos.js';


Migrations.add({
  version: 1,
  up: function() {
    Galleries.rawCollection().createIndex(
      {name: 1},
      {unique: true}
    )

    GallerySearchResponses.rawCollection().createIndex(
      {galleryId: 1, page: 1},
      {unique: true}
    )

    Photos.rawCollection().createIndex(
      {galleryId: 1, flickrId: 1},
      {unique: true}
    )
  }
});

Meteor.startup(() => {
  // Accounts.config({forbidClientAccountCreation: true})
  Migrations.migrateTo('latest');
});

