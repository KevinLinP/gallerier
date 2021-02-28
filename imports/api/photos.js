import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { initCollection } from './common.js'

export const Photos = initCollection('photos')

if (Meteor.isServer) {
  Meteor.publish('photos', () => Photos.find())
}
