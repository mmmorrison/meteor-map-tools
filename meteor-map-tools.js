Markers = new Mongo.Collection("markers");

var map;

if (Meteor.isClient) {
  Meteor.startup(function () {
    function mapLoaded(err, instance) {
      var addedMarkers = map.addMarker(Markers.find({}).fetch());

      // Save UID for Cross reference
      var item, x;
      for (x in addedMarkers) {
        item = addedMarkers[x];
        Markers.update({_id: item._id}, {$set: {uid: item.data.uid}});
      }
    }

    map = new mapTools({id: 'map', lat: 41.3833, lng: 2.1833}, mapLoaded);
  });

  Tracker.autorun(function () {
    var items = Markers.find({}).fetch();

    // Adds Markers found Mongo but not in the Map
    var item, x;
    for (x in items) {
      var item = items[x];
      if (item.lat && (!item.uid || !map.markers.all[item.uid])) {
        map.addMarker(item);
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // Reset for reload testing.
    Markers.remove({})

    if (Markers.find().count() === 0) {
      Markers.insert({lat: 41.3833, lng: 2.1833, title: 'Barcelona'});
    }

    // Use this example to Manually add a record using the console:
    // Markers.insert({lat: 42.5000, lng: 1.5167, title: 'Andorra'});
  });
}
