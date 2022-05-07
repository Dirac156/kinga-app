function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}


export const FindNearestLocation = async (data, location) => {
    const myData = await data.results;
    let locationDistance = []
    for (let i = 0; i < myData.length; i++) {
        const { geocodes } = myData[i];
        const { main } = geocodes;
        locationDistance.push(distance(main.latitude, main.longitude, location.latitude, location.longitude, "K"));
    }
    const min = Math.min(...locationDistance);

    const index = locationDistance.indexOf(min);

    return myData[index]
}

