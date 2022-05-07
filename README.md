# KINGA APP API Documentation

## Description

KINGA APP is a security application that sends signals to emergency contacts and closest officers when a person detects a dangers.

## Features

* Immediate call to closest police officers: The closest police office can receiver a distress alert from our application and will act according to informations provided from the application.

## Documentation

* Register

Send a post request to /user/register with requires user data.

{ email*, password*, name*, address, addressLatitude, addressLongitude }

* Login

To login into our system, you need to provide an email and password to get access to all the features.

send a post request to /user/login.

* Alert

To alert a danger send a post request to /alert/{:userId} with data:

{ latitude, longitude }. This will help us localize where the alert was send and identify the closest police office.

## What's next?

* Implement a voice classifier to identify the person's age, gender, stress level, and other metrics that will help police officers act accordingly.

