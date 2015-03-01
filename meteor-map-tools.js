if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);

        var map = new mapTools({
            id: 'map',
            lat: 41.3833,
            lng: 2.1833,
            type: 'ROADMAP'
        }, function (err, instance) {
            console.log('Map Loaded!', instance);
        });
    }
  });




}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
