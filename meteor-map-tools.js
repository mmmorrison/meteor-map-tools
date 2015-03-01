
Markers = new Mongo.Collection("markers");




if (Meteor.isClient) {
    Meteor.startup(function() {
        var map = new mapTools({
            id: 'map',
            lat: 41.3833,
            lng: 2.1833
        }, function (err, instance) {
            map.addMarker(Markers.find({}).fetch());
        });
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

      Markers.insert({
          lat: 41.3833,
          lng: 2.1833,
          title: 'Barcelona'
      });

    // code to run on server at startup
  });
}
