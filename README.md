# meteor-map-tools 
Meteor + map-tools.js demo project Exemple

### Load Map
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

### Map Template
```html
<body>
{{> map}}
</body>
<template name="map">
    <div id="map"></div>
</template>
```

### Style
```css
html, body, #map {
    height: 100%;
    margin: 0px;
    padding: 0px;
}
```

