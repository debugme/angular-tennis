# Introduction
This application was written to showcase how to build a responsive and performant frontend that is powered by a modular and extensible backend.

## Architecture
* The client is created using a Flexbox based layout that makes use of media queries for a responsive experience
* The server is composed using a connector-based metaphor that simplifies the addition of future functionality
* The endpoints used to generate the data have been intentionally exposed to make debugging and testing simple

## Optimization
* The client is careful not to load extra libraries on the front-end so as to provide for a quick load time
* The server handles data rate limitations imposed by the providers of the external endpoints by employing caching middleware
* As vendor code changes less often than application code, the two are served as separate bundles to leverage browser caching
* The clientside assets (Javascript, CSS, images, etc) are named in a manner to facilitate cache-busting in the browser

## Development
* Source maps are generated to reconcile generated CSS back to the source SASS files they are derived from

# Install Steps
* Install [Node 7.5.0](https://nodejs.org/en/)
* Open a [OpenWeather](http://openweathermap.org) account and make a note of your API key
* Open a [Geocoding](https://developers.google.com/maps/documentation/geocoding/start) account and make a note of your API key

# Build Steps

   Open a Terminal to your folder
   ```
   $
   ```

   Download the project code from GitHub
   ```
   $ git clone https://github.com/debugme/angular-tennis.git
   ```

   Navigate to downloaded folder
   ```
   $ cd angular-tennis
   ```

   Install project dependencies
   ```
   $ npm run reincarnate
   ```

   Copy your OpenWeather API key into [options.json](source/server/options.json)

   Copy your Geocoding API key into [options.json](source/server/options.json)

# Run Steps

   Start up the server
   ```
   $ npm run production
   ```
   Open your browser at
   ```
   http://localhost:3002
   ```

# RESTful Endpoints
The application endpoints are exposed to help with testing
* [Geocode Endpoint](http://localhost:3002/api/geocode/france)
* [Weather Endpoint](http://localhost:3002/api/weather/france/paris)
* [Matches Endpoint](http://localhost:3002/api/matches)
* [Content Endpoint](http://localhost:3002/api/content)

# Technology Stack

* [Angular](https://angularjs.org) - used to build the entire web application
* [Webpack](https://webpack.js.org) - used to concatenate code and assets into bundles
* [Sass](http://sass-lang.co) - used to make styling simpler to understand and maintain
* [Node](https://nodejs.org/en/) - used to host the application server
* [Express](http://expressjs.com) - used to serve the web application to the browser