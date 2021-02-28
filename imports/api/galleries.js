import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { initCollection } from './common.js'

export const Galleries = initCollection('galleries')

if (Meteor.isServer) {
  Meteor.publish('galleries', () => Galleries.find())
}

