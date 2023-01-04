/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      /*
      We can hook into onupdatefound function on the registered Service Worker. Even though you can cache tons of files, the Service Worker only checks the hash of your registered service-worker.js. If that file has only 1 little change in it, it will be treated as a new version.
      //https://medium.com/progressive-web-apps/pwa-create-a-new-update-available-notification-using-service-workers-18be9168d717
      */
      console.log("New content is downloading.");
      
      const updateNow = confirm("Hay una nueva versión de la app! Actualiza ahora por favor :D")
      if(updateNow) window.location.reload()
      
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
