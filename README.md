#Aprima Assignment

This project was done as an assignment for Aprima. I built this project 
by starting off with a blank Ionic template and adding the requested features.

I also added infinite scrolling to the search results and commits view, although
that wasn't strictly required.

The projects has been tested with:

```
ionic 1.7.14
cordova 5.4.1
ios 9.3.1 (built with XCode 7.3) 
```


##Requirements

This application is built with Ionic and Cordova (5), so you need to install those:

```
npm install -g ionic cordova@5
```

If you don't have Node.js and NPM on your machine, please check the installation instructions
for your platform [here](https://nodejs.org/en/).

##Installation

Clone the repository:

```
git clone https://github.com/karvapallo/aprima-assignment
```

Then add the platforms and plugins (only necessary if you want to run it on a decice or a simulator):

```
ionic state reset
```

##Running the project

You can run the project in the browser, simulator or run it on your actual device.

###Browser

To run it in the browser:

```
ionic serve
```

Or if you want to get fancy and run the iOS and Android version side by side in the browser:

```
ionic serve --lab
```

###iOS

If you want to build it for your phone, for iOS I recommend opening the `ios` project
with XCode (under platforms/ios) and compile it with XCode.

###Android

The App has not been tested with an Android device, and if you want to try it out
you should first add the platform:

```
ionic platform add android
```

For Android, if you have the correct build environment set up, you should be able to build it
with:

```
ionic run android --device
```