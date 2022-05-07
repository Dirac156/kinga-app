import fetch from "node-fetch";

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return ` https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20220105&limit=${limit}`
}

export const fetchPolicStation = async (latLong="43.65267326999575,-79.39545615725015", limit=15) => {
    const url = getUrlForCoffeeStores(latLong, "police", limit)
    const response = await fetch(url, {
    "headers": {
      'Authorization': process.env.FOURSQUARE_API_KEY
    }
  });

  let data = [];

  if ( response.status === 200) {
      data = await response.json();
  };
    
    return data
}