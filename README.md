This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Transform a React App into a Progressive Web App (PWA)
Ref: 
- https://medium.com/@toricpope/transform-a-react-app-into-a-progressive-web-app-pwa-dea336bd96e6
- https://appdividend.com/2018/03/14/how-to-build-progressive-web-application-using-react-js/

### Step 1: Register a Service Worker
##### Create a new worker.js file in the public folder (public/worker.js) and add the following code:
```
var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
  '/',
  '/completed'
];

// Install a service worker
this.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
this.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```
##### Update your index.html file in the public folder (public/index.html) to check if the client’s browser supports service workers (lines 17–31):
```xml
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('worker.js').then(function(registration) {
            console.log('Worker registration successful', registration.scope);
          }, function(err) {
            console.log('Worker registration failed', err);
          }).catch(function(err) {
            console.log(err);
          });
        });
      } else {
        console.log('Service Worker is not supported by browser.');
      }
    </script>
  </body>
</html>
```
##### Now, update line 12 of index.js in the src folder (src/index.js) from serviceWorker.unregister() to serviceWorker.register().

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
```
### Step 2: Try reloading your React app without internet connection — when JavaScript is not available.
In order to make sure your React app renders styling and works without any JavaScript loaded, add lines 13–45 and 50–57 (to your index.html file in the public folder (public/index.html).
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
      .navbar {
        background-color: #4169e1;
      }
      .navbar h3 {
        display: inline-block;
        text-align: left;
        padding: 10px;
        color: black;
        text-decoration: none;
      }
      .navbar a {
        display: inline-block;
        padding: 10px;
        color: #fff;
        text-decoration: none;
      }
      .page-info {
        padding: 10px;
      }
      .Current {
        color: #2e8b57;
      }
      .Completed {
        color: #ff6347;
        text-decoration: line-through;
      }
    </style>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      <div class="navbar">
        <h3>Task Manager</h3>
        <a href="/">Current Tasks</a>
        <a href="/completed">Completed Tasks</a>
      </div>
      <p class="page-info">
        Loading...
      </p>
    </div>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('worker.js').then(function(registration) {
            console.log('Worker registration successful', registration.scope);
          }, function(err) {
            console.log('Worker registration failed', err);
          }).catch(function(err) {
            console.log(err);
          });
        });
      } else {
        console.log('Service Worker is not supported by browser.');
      }
    </script>
  </body>
</html>
```
### Step 3: App name, Splash, Icon
Update the "short_name", "icons" array in the manifest.json file in the public folder (public/manifest.json)

### Step 4: Tell the browser it’s a PWA
Add the following code inside <head> tag in the index.html file
```xml
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
```

### > DONE <
