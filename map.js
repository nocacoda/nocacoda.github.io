const colourClasses = [
    'circle-6f6456',
    'circle-cddc49',
    'circle-cb7e94',
    'circle-e94b30',
    'circle-fee659',
    'circle-a1cfdd',
    'circle-fdbab4',
    'circle-0cea20',
    'circle-7dd97d',
    'circle-bcddf7',
    'circle-f4c674',
    'circle-adf875',
    'circle-f4d11e',
    'circle-c397ca',
    'circle-e2f982',
    'circle-f6e39c',
    'circle-dd93e1',
    'circle-26f5cc',
    'circle-f04b50',
    'circle-005350',
    'circle-15a67d',
    'circle-a0f535',
    'circle-acf9b4'
];


let mymap = L.map('map', {
    zoomControl: false
});

// mymap.setView([52.483333, 70], 3);
mymap.setView([30, -11], 2);

L.control.zoom({
    position: 'bottomleft'
}).addTo(mymap);

L.tileLayer(
    'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
    })
    .addTo(mymap);

document.addEventListener('DOMContentLoaded', () => {
    let allPhyla = {},
        nPhyla = 0;

    for (const key in mapData) {
        if (!mapData.hasOwnProperty(key))
            continue;

        const phylum = mapData[key].phylum;
        let colourIndex;
        if (allPhyla.hasOwnProperty(phylum))
            colourIndex = allPhyla[phylum];
        else {
            colourIndex = nPhyla;
            allPhyla[phylum] = nPhyla;
            nPhyla++;
        }

        // Add map markers
        try {
            const latitude = parseFloat(mapData[key].latitude),
                longitude = parseFloat(mapData[key].longitude);
            let circle = L.divIcon({
                className: 'circle ' + colourClasses[colourIndex],
                iconSize: [10, 10]
            });
            let marker = L.marker([latitude, longitude], {
                icon: circle,
                title: key
            });

            console.log('Created marker');

            marker.on('click', () => {
                window.open(`langpages/${key}.html`)
            });
            marker.addTo(mymap);

            console.log('Added marker');

        } catch (err) {
            console.log(err);
        }
    }
});