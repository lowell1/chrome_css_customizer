// create initial state for inputs

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    styles: [
      {
        name: "Dark Mode",
        active: true,
        content: "*{background-color:black;color:white",
      },
      {
        name: "Big Text",
        active: true,
        content: "*{font-size: 100px;}",
      },
    ],
  });
});
