# meteor-map-tools 

***work in progress***

### What is this page?
This is a [Meteor](https://github.com/meteor/meteor) & [map-tools.js](https://github.com/yagoferrer/map-tools) demo lab project, that uses `bower` as install method. My goal is to enhance map-tools.js with helpers for Meteor reactivity (if there is a need) and then: create a Meteor package that can be mantained from this repo.

### Project status
This is what I have so far: 
1 Load the Map
2 Query Mongo for Markers to add.
3 Save UID back into Mongo for cross-reference.
4 Track changes
5 Add new Markers pushed from server-side.

### Install steps

#### Add bower package manager
```bash
meteor add mquandalle:bower
```

#### Create bower.json
```json
{
  "name": "meteor-map-tools",
  "version": "0.1.0",
  "dependencies": {
    "map-tools": "0.6.0"
  }
}
```

#### Load Map
After loading the Map, I add the Markers from a Mongo Query and I save the UID back into Mongo for cross-reference.
```javascript
  Meteor.startup(function () {
    function mapLoaded(err, instance) {
      var addedMarkers = map.addMarker(Markers.find({}).fetch());
      // Save UID for Cross-reference
      var item, x;
      for (x in addedMarkers) {
        item = addedMarkers[x];
        Markers.update({_id: item._id}, {$set: {uid: item.data.uid}});
      }
    }
    map = new mapTools({id: 'map', lat: 41.3833, lng: 2.1833}, mapLoaded);
  });
```

#### Simple Reactivity
Track changes into the Collection and add new added Markers into Mongo.
```javascript
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
```

#### Map Template
```html
<body>
{{> map}}
</body>
<template name="map">
    <div id="map"></div>
</template>
```

#### Style
```css
html, body, #map {
    height: 100%;
    margin: 0px;
    padding: 0px;
}
```

#### Adding Markers
```javascript
Markers = new Mongo.Collection("markers");
// Server
if (Meteor.isServer) {
  Meteor.startup(function () {
      Markers.insert({
          lat: 41.3833,
          lng: 2.1833,
          title: 'Barcelona'
      });
  });
}
// Client
map.addMarker(Markers.find({}).fetch());
```

