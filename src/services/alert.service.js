import { fetchPolicStation } from "../subscribers/four_square.js";
import { FindNearestLocation } from "../helpers/findNearestLocation.js";
import { makePhoneCall } from "../subscribers/twilo.js";
import User from "./user.service.js";



class Alert {


    static async handleUserAlert(userId, location) {
        const { latitude, longitude } = location;
        let user = await User.findUserById(userId);

        const latLong = `${latitude},${longitude}`

        const polices = await fetchPolicStation(latLong, 15);

        const nearestPolice = await FindNearestLocation(polices, location);

        // make an api call to call the police station

        // or send an email or a text message.

        const result = {
            user: { email: user.email, address: user.address },
            closestPoliceOffice: nearestPolice
        }

        // makePhoneCall();

        return result;
    }
}

export default Alert; 