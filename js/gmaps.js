// Google maps initialize

function initialize() {
    // Change the latitude and longitude to your location. You can also get the coordinates here: http://itouchmap.com/latlong.html
    var myLatlng = new google.maps.LatLng(35.2167, -97.4167);
    var mapOptions = {
        zoom: 7,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    var infowindow = new google.maps.InfoWindow({
        content:
            '<div class="map-wrap">' +
                // Company name
                '<div class="b-title">' + 'Gladiator Roofing & Construction' + '</div>' +
                // Company street
                '<p>' + 'P.O. Box 721623' + '</p>' +
                // Company city and state
                '<p>' + 'Norman, Ok. 73070' + '</p>' +
                // Clearfix with border
                '<div class="clrfx map-div">' + '</div>' +
                // Phone
                '<div class="b-info">' + '<span class="entypo-phone">' + '</span>' + '(405) 763-7777' + '</div>' +
                // Email
                '<div class="b-info">' + '<span class="entypo-paper-plane">' + '</span>' + 'info@gladiatorroofing.com' + '</div>' +
                // Mobile
                //'<div class="b-info">' + '<span class="entypo-mobile">' + '</span>' + '00 268 123 789' + '</div>' +
                // Website
                '<div class="b-info">' + '<span class="entypo-monitor">' + '</span>' + 'www.gladiatorroofing.com' + '</div>' +
                // Bottom margin clearfix
                '<div class="clrfx mt-10">' + '</div>' +
            '</div>'
    });
    makeInfoWindowEvent(map, infowindow, marker);
}

function makeInfoWindowEvent(map, infowindow, marker) {
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);