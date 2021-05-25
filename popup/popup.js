// initialize things with storage

/*
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
*/

// to be replaced by chrome storage
const styleSheets = [
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
];

const handleToggleClick = (idx) => (event) => {
  // event.target.classList.toggle("on");
  styleSheets[idx].active = !styleSheets[idx].active;

  event.target.classList.toggle("on");

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(({ id }) => {
      console.log("id", id);
      chrome.tabs.sendMessage(id, styleSheets[idx]);
    });
  });

  // console.log("idx: %s, active; %s", idx, styleSheets[idx].active);
};

// add options for existing style sheets to body of extension

// body of extension
const body = document.querySelector("body");

styleSheets.map((curStyleSheet, idx) => {
  const toggle = document.createElement("div");

  curStyleSheet.active
    ? toggle.classList.add("toggle", "on")
    : toggle.classList.add("toggle");

  toggle.innerText = curStyleSheet.name;
  toggle.addEventListener("click", handleToggleClick(idx));

  body.appendChild(toggle);
});
