# 🌊 Express, React and Routing 🌊

It is worth discussing about how to serve frontend developed using React Library with Express as a backend.

---
<br>

## Routing

React is known for its client-side Routing capabilities, which encourages the SPA pattern (Single Page Application)

The client sends a iniital request to fetch the application from the server, the server responds with the entire bundled React frontend. When client clicks a link on the web application, React intercepts the request to the server, and loads the respective view which is already downloaded from the server in initial request.

Routing in React is done via package `react-router-dom`, commonly through `BrowserRouter, Route, Switch, Link` etc. References see [__HERE__](https://reactrouter.com/web/guides/quick-start)

---
<br>

Once we ran `npm run build` in the react directory, our whole React application is built into a single HTML file and some javascript bundles. That's what our ExpressJS server needed to serve!

However, one problem if our application uses routing, is that the routing process is done via client-side javascript from our React. Problem arises, if say the client tries to load `/abouts`, but the client has not yet downloaded the JS code yet from our server, and our server does not recognize the route `/abouts` (The route is only recognized in our React app). This ends up in a 404 error.

One workaround is to use wildcard `/*` to always serve our React application. However, this approach is bad for SEO (Search Engine Optimization), since for every route, the search engine always retrieve the same document.

---
<br>

# ⚙️ Usage ⚙️

Clone the repository. Run `npm install` to install dependencies. `npm start` in the root directory to start server, and `npm start` in the `react-frontend` directory to start the React development server.