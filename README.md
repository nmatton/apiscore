# Apiscore - Evaluez votre environnement apicole

## What is it ?
Apiscore is a Web-based application for basic Spatial Analysis tools designed for assessing neighborhood of an apiary.
The application is accessible at that location: [apiscore.be](https://apiscore.be)

![How it works?](assets/img/info.gif?raw=true "How it works?")

## On what it is based ?

The web app is developped using HTML and Javascript as front-end; php and a PostGIS db as back-end

# Contribute

All PR's are welcome to improve the application !

All the developments are made on my personal free time, you can also [donate](https://www.paypal.com/donate?hosted_button_id=JYUZVFAGMGXD4) to support me !

Thanks !

# Background

## Mapbox

The map layout is using [mapbox](https://mapbox.com) framework.
This framework is easy to setup and use.
The following features are used:
- use of a custom style : https://docs.mapbox.com/mapbox-gl-js/example/custom-style-id/
- zooming on clicked position : https://docs.mapbox.com/mapbox-gl-js/example/fitbounds/
- many other (list to be completed)

## Display of the circle: Turf.js

Turf.js was used to create the circle

## Graph display : chart.js

Chart.js was used to create the circle. 
A single graph instance was created for each graph (pie chart and hedgerow graph). CSS rules are used for changing the display

## Communication with PostGIS db

A [php script](assets/php/data.php) is writted to communicate with the PostGIS database that contains the layers, either in vector or raster format.
The request are made to the PostGIS server, and the php script returns results as a formatted json array.

# Data Sources

All data used in the project are available on open access licenses.

## Ecotopes
- source : https://maps.elie.ucl.ac.be/lifewatch/ecotopes.html
- data format : vector
- processing applied : none
- WMS layer : https://maps.elie.ucl.ac.be/cgi-bin/mapserv72?map=/maps_server/lifewatch/mapfiles/v3.10/LW_Belgium_ecotopes_lc_raster.map&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=lccs&TILED=true&date_db=2015&WIDTH=256&HEIGHT=256&CRS=EPSG:3812&STYLES=

Note that the WMS layer is only accessible on a Lambert Belge 2008 projection (EPSG 3812) while mapbox only accepts EPSG 3857 for the WMS layers. [See here](https://github.com/mapbox/mapbox-gl-js/issues/3184) for more details, but [the following example](https://jsfiddle.net/vw3oes9h/) was the actual solution
