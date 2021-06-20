/*
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear();
  chrome.storage.local.set({ inputs: { darkMode: false } });
});

// create initial state for inputs

// chrome.storage.local.set({ inputs: { darkMode: false, input2: true } });
*/

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
