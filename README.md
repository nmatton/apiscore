# Apiscore - Evaluez votre environnement apicole

## What is it ?
Apiscore is a Web-based application for basic Spatial Analysis tools designed for assessing neighborhood of an apiary.
The application is accessible at that location: [apiscore.be](https://apiscore.be)

![How it works?](assets/img/info.gif?raw=true "How it works?")

## On what it is based ?

The web app is developped using HTML and Javascript as front-end; php and a PostGIS db as back-end

# Contribute

All PR's are welcome to improve the application !

You can also fill an issue if you have one to report ;)

All the developments are made on my personal free time, you can also [donate](https://www.paypal.com/donate?hosted_button_id=JYUZVFAGMGXD4) to support me !

Thanks !

# License

The complete project is under license GPL-v3. Check the [LICENSE](LICENSE) for more details.

# Background

## Mapbox

The map layout is using [mapbox](https://mapbox.com) framework.
This framework is easy to setup and use.
The following features are used:
- use of a custom style : https://docs.mapbox.com/mapbox-gl-js/example/custom-style-id/
- zooming on clicked position : https://docs.mapbox.com/mapbox-gl-js/example/fitbounds/
- many other (list to be completed)

## Display of the circle: Turf.js

[Turf.js](https://turfjs.org) was used to create the circle of 3KM where user clic, and added as a distinct source layer to mapbox.

## Graph display : chart.js

[Chart.js](https://www.chartjs.org) was used to create the graphs. 
A single graph instance was created for each graph (pie chart and hedgerow graph). CSS rules are used for changing the display

## Communication with PostGIS db

A [php script](assets/php/data.php) is writted to communicate with the PostGIS database that contains the layers, either in vector or raster format.
The request are made to the PostGIS server, and the php script returns results as a formatted json array.
Credentials are stored in a separate php file "localsettings.php". An example of the file is provided in the php folder.

Make sure that the server has the php-postgres module enabled.

## PostGIS db setup

A basic postgresql instance with PostGIS extension was installed. The layers described below (except for orthophoto) are loaded to the db using [FME](https://www.safe.com), an ETL tool. The loading can also be achieved using shp2pgsql or raster2pgsql tools.

## Modal window and graph window

The welcome modal window and the window containing the graphs are created and managed using the [framejs](https://github.com/riversun/JSFrame.js/tree/master/src) module developped by Tom Misawa (riversun).

# Data Sources

All data used in the project are available on open access licenses. All data are available for download (except orthophoto due to file size limitations).

## Ecotopes
- source : https://maps.elie.ucl.ac.be/lifewatch/ecotopes.html
- data format : vector
- [WMS layer](https://maps.elie.ucl.ac.be/cgi-bin/mapserv72?map=/maps_server/lifewatch/mapfiles/v3.10/LW_Belgium_ecotopes_lc_raster.map&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=lccs&TILED=true&date_db=2015&WIDTH=256&HEIGHT=256&CRS=EPSG:3812&STYLES=)

Note that the WMS layer is only accessible on a Lambert Belge 2008 projection (EPSG 3812) while mapbox only accepts EPSG 3857 for the WMS layers. [See here](https://github.com/mapbox/mapbox-gl-js/issues/3184) for more details, but [the following example](https://jsfiddle.net/vw3oes9h/) was the actual solution

## Land Cover
- source : https://geoportail.wallonie.be/walous
- data format : raster
- [WMS layer link](https://geoservices.wallonie.be/arcgis/services/SOL_SOUS_SOL/WALOUS_OCCUPATION_SOL/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=256&HEIGHT=256&LAYERS=0&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE)

This layer was created in the frame of the Walous project. This inter-Universities research project used orthophotos of 2018 and ancillary data to produce high resolution land cover map for complete Waloon region.

## Agricultural fields
- source : https://geoportail.wallonie.be/catalogue/81bdf8bc-5968-4fd3-84ca-26be011cddd6.html
- data format : vector
- [WMS layer link](https://geoservices.wallonie.be/arcgis/services/AGRICULTURE/SIGEC_PARC_AGRI_ANON__2018/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=256&HEIGHT=256&LAYERS=0&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE)

This layer provides the agricultural parcels for complete region, based on legal declaration of farmers. There is a (quite long) delay between production (farmer's declaration) and publication, thus one year delay applies.

## Aerial photography (orthophotos)
- source : https://geoportail.wallonie.be/catalogue/a4c49df8-8e51-4ec2-9be0-9186cb499236.html
- data format : raster
- [WMS layer link](https://geoservices.wallonie.be/arcgis/services/IMAGERIE/ORTHO_2019/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=256&HEIGHT=256&LAYERS=0&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE)

The orthophotos of 2019 are used instead of 2020 due to a seasonal effect. 2019 are during summer while 2020 are during spring, where vegetation is sometimes at a too early stage for clear distinction.

## Hedgerows
- source : https://geoportail.wallonie.be/catalogue/b795de68-726c-4bdf-a62a-a42686aa5b6f.html
- data format : vector
- [WMS layer link](https://geoservices.wallonie.be/arcgis/services/TOPOGRAPHIE/PICC_VDIFF/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=256&HEIGHT=256&LAYERS=16&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE)

