# Install Steps

Install [Node 7.5.0](https://nodejs.org/en/)

Open a [OpenWeather](http://openweathermap.org) account and paste your API key into [options.json](source/server/options.json)

Open a [Geocoding](https://developers.google.com/maps/documentation/geocoding/start) account and paste your API key into [options.json](source/server/options.json)


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

# Run Steps

   Start up the server
   ```
   $ npm run production
   ```
   Open your browser at
   ```
   http://localhost:3002
   ```

# Technology Stack

* [Angular](https://angularjs.org) - used to build the entire web application
* [Webpack](https://webpack.js.org) - used to concatenate code and assets into bundles
* [Sass](http://sass-lang.co) - used to make styling simpler to understand and maintain
* [Node](https://nodejs.org/en/) - used to host the application server
* [Express](http://expressjs.com) - used to serve the web application to the browser