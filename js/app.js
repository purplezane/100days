//Author: Michael M Bowser
//Date: 12-30-2016
//Purpose: JavaScript file to add data and functionality to web map
//Use: This JS file is called in the index.html file

		//Create map variable and set view and zoom levels
        var map = L.map('map', {
            zoomControl:false, maxZoom:16, minZoom:7
        }).setView([38.864,-77.358],11);
		
		//Add zoom controls to map
		L.control.zoom({
			position:'bottomright'}).addTo(map);
        
		//Create feature group variable that is used below
        var feature_group = new L.featureGroup([]);
        
		//Base map layer and zoom limits
        var osmGreyscale = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 16});
			
		bingAerial = new L.BingLayer("Avo_iE-EZ7u_XMpLk3hneXC0JOseVdGYSJYqkoYhwIOtwfirB9XEOa0-thHMPAtf", {type: 'AerialWithLabels'});	
			
		//Add basemap to map
		bingAerial.addTo(map);
        osmGreyscale.addTo(map);
		
        	
		//Popup controls
		layerControl = L.control.layers({},{},{collapsed:false});
          function pop_ProjectSites0(feature, layer) {
            var popupContent = '<table><tr align="center"><th scope="row">Project Identifier</th></tr><tr align="center"><td>' + (feature.properties['MMCount'] !== null ? Autolinker.link(String(feature.properties['MMCount'])) : '') + '</td></tr></table>';
			layer.bindPopup(popupContent);}	
		
		//Style parameters for the WSSI sites polygon
		var sitesPolyStyle = {
			"weight": 0,
			"color": "#52ea8c",
			"fillOpacity": .5,
			"fillColor": '#006400'};
		
		//GeoJson object for the WSSI sites
        var json_ProjectSites0JSON = new L.geoJson(json_sitesSmooth5000, {
            onEachFeature: pop_ProjectSites0, 
            style: sitesPolyStyle
            });
		//Add the feature group containing the GeoJson object to the map	
		feature_group.addLayer(json_ProjectSites0JSON);
        feature_group.addTo(map);
		
		//Define the coordintes used to restrict the geocoder
		var southWest = L.latLng(39.681988, -75.935048),
			northEast = L.latLng(35.247897, -86.158289),
			boundsGeo = L.latLngBounds(southWest, northEast);
		
		//Creates the geocoder object
        var osmGeocoder = new L.Control.OSMGeocoder({
            collapsed: true,
            position: 'topright',
            text:'Search Address',
			bounds: boundsGeo,});
		
		//Adds the goecoder to the map		
        osmGeocoder.addTo(map);
		
		
        var basemapsLegend = {
			"Bing Maps Aerial": bingAerial,
			"OSM Greyscale": osmGreyscale
			
				
		};
		
		//Adds legend controls
		L.control.layers(basemapsLegend,{'<img src="legend/siteCoverage.png" /> WSSI Project Area': json_ProjectSites0JSON,},{collapsed:true, position:'topleft'}).addTo(map);
		
		//Adds scale controls
        L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
        
		//northern virginia office marker and label
		var myIcon = L.icon({
			iconUrl: 'marker-icon.png',	
			labelAnchor: [20, 0] 
		});		
		var myMarker1 = L.marker([38.796005, -77.601065], {
			icon: myIcon
			}).bindLabel('<b><center>Wetland Studies and Solutions, Inc.</br>Northern Virginia Office</center></b>', {
			noHide: true,
			direction: 'auto'
		});	
		map.on('zoomend ', function(e) {
			if (map.getZoom() < 16){map.removeLayer(myMarker1)}
 				else if(map.getZoom() >= 16) {map.addLayer(myMarker1)}});
				
		//southwestern virginia office marker and label
		var myIcon = L.icon({
			iconUrl: 'marker-icon.png',	
			labelAnchor: [20, 0] 
		});		
		var myMarker2 = L.marker([37.264927, -79.977214], {
			icon: myIcon
			}).bindLabel('<b><center>Wetland Studies and Solutions, Inc.</br>Southwestern Virginia Office</center></b>', {
			noHide: true,
			direction: 'auto'
		});	
		map.on('zoomend ', function(e) {
			if (map.getZoom() < 16){map.removeLayer(myMarker2)}
 				else if(map.getZoom() >= 16) {map.addLayer(myMarker2)}});
				
		
		//maryland office marker and label
		var myIcon = L.icon({
			iconUrl: 'marker-icon.png',	
			labelAnchor: [20, 0] 
		});		
		var myMarker3 = L.marker([39.094354, -76.635033], {
			icon: myIcon
			}).bindLabel('<b><center>Wetland Studies and Solutions, Inc.</br>Maryland Office</center></b>', {
			noHide: true,
			direction: 'auto'
		});	
		map.on('zoomend ', function(e) {
			if (map.getZoom() < 16){map.removeLayer(myMarker3)}
 				else if(map.getZoom() >= 16) {map.addLayer(myMarker3)}});
		
		
		