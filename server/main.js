import { Meteor } from 'meteor/meteor';
import { Galleries } from '../imports/api/galleries.js';

// Migrations.add({
//   version: 1,
//   up: function() {
//   }
// });

Meteor.startup(() => {
  // Accounts.config({forbidClientAccountCreation: true})
  // Migrations.migrateTo('latest');
});

