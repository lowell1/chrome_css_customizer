// content script for adding and removing css in the web page

chrome.runtime.onMessage.addListener((request) => {
  console.log(request);

  // remove stylesheet from webpage
  // if(request.removeCSS)
  //     console

  // add stylesheet to webpage
});
console.log("hello world");
