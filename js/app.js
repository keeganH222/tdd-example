/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library.
 */

// The names and URLs to all of the feeds we'd like available.
const allFeeds = [
  {
    name: 'Udacity Blog',
    url: 'http://blog.udacity.com/feed'
  }, {
    name: 'CSS Tricks',
    url: 'http://feeds.feedburner.com/CssTricks'
  }, {
    name: 'HTML5 Rocks',
    url: 'http://feeds.feedburner.com/html5rocks'
  }, {
    name: 'Linear Digressions',
    url: 'http://feeds.feedburner.com/udacity-linear-digressions'
  }
];

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
const init = () => {
    // Load the first feed we've defined (index of 0).
    loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */
const loadFeed = (id) => {
  let feedUrl = allFeeds[id].url,
      feedName = allFeeds[id].name;

return fetch("https://rsstojson.udacity.com/parseFeed", {
    method: "POST",
    body: JSON.stringify({url: feedUrl}),
    headers: {
        'Content-Type': 'application/json'
    },
  }).then(response => {
    return response.json();
  }).then(result => {
    let container = document.querySelector('.feed'),
    title = document.querySelector('.header-title'),
    entries = result.feed.entries,
    entriesLen = entries.length,
    entryTemplate = Handlebars.compile(document.querySelector('.tpl-entry').innerHTML);

    title.textContent = feedName;   // Set the header text
    container.innerHTML = "";      // Empty out all previous entries

    /* Loop through the entries we just loaded via the Google
      * Feed Reader API. We'll then parse that entry against the
      * entryTemplate (created above using Handlebars) and append
      * the resulting HTML to the list of entries on the page.
      */
    entries.forEach(entry => {
        container.insertAdjacentHTML('afterbegin', entryTemplate(entry));
    });
  });
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in an event listener the to ensure it doesn't execute
 * until the DOM is ready.
 */

document.addEventListener("DOMContentLoaded", () => {
  let container = document.querySelector('.feed'),
    feedList = document.querySelector('.feed-list'),
    feedItemTemplate = Handlebars.compile(document.querySelector('.tpl-feed-list-item').innerHTML),
    feedId = 0,
    menuIcon = document.querySelector('.menu-icon-link');

  /* Loop through all of our feeds, assigning an id property to
  * each of the feeds based upon its index within the array.
  * Then parse that feed against the feedItemTemplate (created
  * above using Handlebars) and append it to the list of all
  * available feeds within the menu.
  */
  allFeeds.forEach(feed => {
    feed.id = feedId;
    feedList.insertAdjacentHTML('afterbegin', feedItemTemplate(feed));
    feedId++;
  });

  /* When a link in our feedList is clicked on, we want to hide
  * the menu, load the feed, and prevent the default action
  * (following the link) from occurring.
  */
  feedList.addEventListener('click', (e) => {
    if(e.target.nodeName === "A") {
      const item = e.target;
      document.body.classList.add('menu-hidden');
      loadFeed(item.dataset.id);
      e.preventDefault();
    }
  });

  /* When the menu icon is clicked on, we need to toggle a class
  * on the body to perform the hiding/showing of our menu.
  */
  menuIcon.addEventListener('click', () => {
    document.body.classList.toggle('menu-hidden');
  });
})