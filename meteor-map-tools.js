if (Meteor.isClient) {
    Meteor.startup(function() {
        var map = new mapTools({
            id: 'map',
            lat: 41.3833,
            lng: 2.1833
        }, function (err, instance) {
            console.log('Map Loaded!', instance);
        });
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
