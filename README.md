# `this` to `fetch` Example

> This repo is a study guide for completing the [restful-pjs](https://github.com/hackyourfuturebelgium/restful-pjs) project

The code to study in this repo is two apps with the same behavior.  But what is an app?  An app is __Data + User Interactions__.

One of the big questions in application design is how the user and the data are brought together.  Until now your apps have all run locally in the Browser so this question was pretty easy to answer.  But full web applications are fundamentally different,  the data is hosted on a server and the user gets access to the data by sending _http requests_ to fetch the data they need.

The three example apps in this Repo have identical user experiences with fundamentally different implementations:

* `__app-this.js__`: Stores it's data locally in the browser as a property in your app.  To access the data you use `this`.  `app-this` is _synchronous_.
* `__app-fetch-promises.js__`: Stores it's data as a .json file behind a RESTful API, a true fullstack web app!  To access the data you need to use `fetch` to send a requests to your API. `app-fetch` is _asynchronous_, it uses promises.
* `__app-fetch-async-await.js__`: Stores it's data as a .json file behind a RESTful API, a true fullstack web app!  To access the data you need to use `fetch` to send a requests to your API. `app-fetch` is _asynchronous_, it uses async/await.

---

## Instal Instructions

* clone repo & cd into the new directory
* `npm install`
* `npm run start`
* navigate to `localhost:3000` in your browser
