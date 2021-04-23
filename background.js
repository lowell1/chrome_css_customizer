chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear();
  chrome.storage.local.set({ inputs: { darkMode: false } });
});

// create initial state for inputs

// chrome.storage.local.set({ inputs: { darkMode: false, input2: true } });
