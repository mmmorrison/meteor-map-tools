# meteor-map-tools 

***work in progress***

### What is this page?
This is a Meteor + [map-tools.js](https://github.com/yagoferrer/map-tools) demo lab project, that uses `bower` as install method. My goal is to enhance map-tools.js with helpers for Meteor reactivity (if there is a need) and then create a Meteor package.

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
```javascript
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

