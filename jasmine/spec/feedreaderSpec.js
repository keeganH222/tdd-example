
/* This is our first test suite - a test suite just contains
* a related set of tests. This suite is all about the RSS
* feeds definitions, the allFeeds variable in our application.
*/
describe('RSS Feeds', () => {

  it('are defined', () => {
    expect(allFeeds).toBeDefined();
    expect(allFeeds.length).not.toBe(0);
  });
  /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
   it("making sure feeds array url is defined and not an empty string", () => {
     for(let ele of allFeeds) {
       expect(ele.url).toBeDefined();
       expect(ele.url).not.toBe("");
     }
   });
  /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
   it("Making sure the feeds array elements have a name", () => {
    for(let ele of allFeeds) {
      expect(ele.name).toBeDefined();
      expect(ele.name).not.toBe("");
    }
   });

});


/* TODO: Write a new test suite named "The menu" */
describe("The menu", () => {
  const menu = document.querySelector("body");
  const menuIcon = document.querySelector('.menu-icon-link');
  /* TODO: Write a test that ensures the menu element is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */
  it("Menu tab is hidden by default", () => {
    expect(menu.classList.contains("menu-hidden")).toBe(true);
  });
      /* TODO: Write a test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
  /*it("does the Menu functionality work", () => {
    menuIcon.click();
    expect(menu.classList.contains('menu-hidden')).toBe(false);
    menuIcon.click();
    expect(menu.classList.contains('menu-hidden')).toBe(true);
  })*/
})

/* TODO: Write a new test suite named "Initial Entries" */
describe("Initial Entries", () => {
  //check the feed container when loaded to make sure there is content
   it("Making sure there is content when the page loads", () => {
     return loadFeed(0).then(() => {
       const feedContainer = document.querySelector(".feed").children;
       expect(feedContainer.length).toBeGreaterThan(0);
     })
   })
})


/* TODO: Write a new test suite named "New Feed Selection" */
describe("New Feed Selection", () => {
  let originalFeed;
  let newfeed;
  let feedPromise;
  let originalHead;
  let newHead;
  beforeEach(() => {
    feedPromise = new Promise((resolve) => {
      loadFeed(0).then(() => {
        originalFeed = document.querySelector(".feed").children[0].querySelector("h2");
        originalHead = document.querySelector(".header-title").textContent;
        resolve();
      });
    }).then(() => {
      loadFeed(2).then(() => {
        newfeed = document.querySelector(".feed").children[0].querySelector("h2"); 
        newHead = document.querySelector('.header-title').textContent;       
      })
    });
  })
  it("Loadfeed should change the content when clicked", () => {
      /* TODO: Write a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */ 
   return feedPromise.then(() => {
    expect(newfeed).not.toBe(originalFeed);
   })
  });

      /* Write a test to make sure that the content in the element 'header-title'
    * matches the content found in the 'a' link that was clicked
    */
  it("Should change change the header tag when feed changes", () => {
    return feedPromise.then(() => {
      expect(newHead).not.toBe(originalHead);
    })
    
  })
})




