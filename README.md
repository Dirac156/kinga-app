# KINGA APP API Documentation

## Description

KINGA APP is a security application that sends signals to emergency contacts and closest officers when a person detects a dangers.

## Features

* Immediate call to closest police officers: The closest police office can receiver a distress alert from our application and will act according to informations provided from the application.

## Documentation

* Register

Send a post request to /user/register with requires user data.

{ email*, password*, name*, address, addressLatitude, addressLongitude }

{
    status: true,
    message: "..."
}

* Login

To login into our system, you need to provide an email and password to get access to all the features.

send a post request to /user/login.

Reponse:

{
    "status": true,
    "payload": {
        "_id": "62656042ab0bd2152b7f0306",
        "email": "dmurairimukongya@gmail.com",
        "password": "$2b$10$tWj2Hcq9HNwMPv40IS9f9uubpSsd2JrzGOv1B0mRWYgsx2oOwc2dK",
        "__v": 0
    },
    "session": "8b1ea5b6-054e-4a86-bd41-eac06405b19e",
    "message": "User loged in."
}

* Alert

To alert a danger send a post request to /alert/{:userId} with data:

{ latitude, longitude }. This will help us localize where the alert was send and identify the closest police office.

Response:

{
    "user": {
        "email": "dmurairimukongya@gmail.com"
    },
    "closestPoliceOffice": {
        "fsq_id": "4fa23e8ee4b00833144e751f",
        "categories": [
            {
                "id": 12074,
                "name": "Military Base",
                "icon": {
                    "prefix": "https://ss3.4sqi.net/img/categories_v2/building/militarybase_",
                    "suffix": ".png"
                }
            }
        ],
        "chains": [],
        "distance": 0,
        "geocodes": {
            "main": {
                "latitude": -1.977752,
                "longitude": 30.159338
            }
        },
        "link": "/v3/places/4fa23e8ee4b00833144e751f",
        "location": {
            "country": "RW",
            "cross_street": "",
            "formatted_address": "",
            "postcode": ""
        },
        "name": "RDF Military Police",
        "related_places": {},
        "timezone": "Africa/Kigali"
    }
}

## What's next?

* Implement a voice classifier to identify the person's age, gender, stress level, and other metrics that will help police officers act accordingly.

