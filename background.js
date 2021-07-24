// create initial state for inputs

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    styles: [
      {
        name: "Dark Mode",
        active: false,
        content: `* {
                      background-color: black !important;
                      color: white !important;
                    }`,
      },
      {
        name: "Big Text",
        active: false,
        content: "*{font-size: 100px;}",
      },
    ],
  });
});
