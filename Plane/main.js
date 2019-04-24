var time = new Date().getTime();
function refresh() {
    if(new Date().getTime() - time >= 10000) 
        window.location.reload(true);
    else 
        setTimeout(refresh, 10000);
}

setTimeout(refresh, 10000);

var url = "https://opensky-network.org/api/states/all";
fetch(url)
.then(function(response){
    return response.json();
})
.then(function(json){
    //console.log(json);
    //console.log(json.states);
    var planes = json.states;
    // console.log(planes);
    var canPlanes = new Array();
    for(let i=0;i<planes.length;i++){
        if(planes[i][2]=="Canada")
            canPlanes.push(planes[i]);
    }
    //console.log(canPlanes);
    var canPlanesJSON = new Array();
    for(let j=0;j<canPlanes.length;j++){
        let element = {icao24: canPlanes[j][0], callsign: canPlanes[j][1], originCountry: canPlanes[j][2], timePosition: canPlanes[j][3], lastContact: canPlanes[j][4], coordinates: [canPlanes[j][6],canPlanes[j][5]]};
        canPlanesJSON.push(element);
    }
    //console.log(canPlanesJSON);
    (function(){

        //create map in leaflet and tie it to the div called 'theMap'
        var map = L.map('theMap').setView([42, -60], 4);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        //console.log(canPlanesJSON);
        var planeIcon = L.icon({
            iconUrl: 'plane.png',
            iconSize: [30,30]
        });
        for(let k=0;k<canPlanesJSON.length;k++){
            //console.log(canPlanesJSON[k]);
            //console.log(canPlanesJSON[k].coordinates);
            try{
                L.marker(canPlanesJSON[k].coordinates,{icon: planeIcon}).addTo(map)
                .bindPopup(JSON.stringify(canPlanesJSON[k]));
            }
            catch(error){
                console.log(error.message);
            }
        }
    
        /* L.marker([42, -60]).addTo(map)
            .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.')
            .openPopup();
    */
    
    })()

})
