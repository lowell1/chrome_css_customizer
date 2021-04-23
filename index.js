// initialize things with storage

chrome.storage.local.get(["inputs"], ({ inputs }) => {
  document.querySelectorAll(".toggle").forEach((ele) => {
    if (inputs[ele.id] === true) ele.classList.add("on");

    ele.addEventListener("click", onToggleClick);
  });
});

// set value of input in chrome storage
function setInputState(id, val) {
  chrome.storage.local.get(["inputs"], ({ inputs }) => {
    chrome.storage.local.set({ inputs: { ...inputs, [id]: val } }, () =>
      chrome.storage.local.get(["inputs"], console.log)
    );
  });
}

function onToggleClick(event) {
  event.target.classList.toggle("on");
  setInputState(event.target.id, event.target.classList.contains("on"));
}
