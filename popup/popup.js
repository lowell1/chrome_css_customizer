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
// const styleSheets = [
//   {
//     name: "Dark Mode",
//     active: true,
//     content: "*{background-color:black;color:white",
//   },
//   {
//     name: "Big Text",
//     active: true,
//     content: "*{font-size: 100px;}",
//   },
// ];

// const handleToggleClick = (idx) => (event) => {
//   // event.target.classList.toggle("on");
//   // styleSheets[idx].active = !styleSheets[idx].active;

//   chrome.storage.local.get("styles", ({ styles }) => {
//     chrome.storage.local.set({ styles: { ...styles, [id]: val } }, () =>
//       chrome.storage.local.get(["styles"], console.log)
//     );
//   });

//   event.target.classList.toggle("on");

//   chrome.tabs.query({}, (tabs) => {
//     tabs.forEach(({ id }) => {
//       chrome.tabs.sendMessage(id, styleSheets[idx]);
//     });
//   });

//   // console.log("idx: %s, active; %s", idx, styleSheets[idx].active);
// };

// add options for existing style sheets to body of extension

// body of popup
// const body = document.querySelector("body");

// styleSheets.map((curStyleSheet, idx) => {
//   const toggle = document.createElement("div");

//   curStyleSheet.active
//     ? toggle.classList.add("toggle", "on")
//     : toggle.classList.add("toggle");

//   toggle.innerText = curStyleSheet.name;
//   toggle.addEventListener("click", handleToggleClick(idx));

//   body.appendChild(toggle);
// });
// chrome.storage.local.get("styles", ({ styles }) => {
//   styles.map((curStyleSheet, idx) => {
//     const toggle = document.createElement("div");

//     curStyleSheet.active
//       ? toggle.classList.add("toggle", "on")
//       : toggle.classList.add("toggle");

//     toggle.innerText = curStyleSheet.name;
//     toggle.addEventListener("click", handleToggleClick(idx));

//     body.appendChild(toggle);
//   });
// });

// add style to chrome storage

// const createStyle = ({ content, name }) => {
//   chrome.storage.local.get("styles", ({ styles }) => {
//     chrome.storage.local.set(
//       {
//         styles: [...styles, { active: false, content, name }],
//       },
//       () => console.log("set storage")
//     );
//   });
// };

// modify style in chrome storage

// remove style from storage
const handleDeleteClick = (event, idx) => {
  event.stopPropagation();

  chrome.storage.local.get("styles", ({ styles }) => {
    styles.splice(idx, 1);

    chrome.storage.local.set({
      styles,
    });
  });

  window.location.reload();
};

// update all tabs with all styles in storage

const handleToggleClick = (idx) => (event) => {
  chrome.storage.local.get("styles", ({ styles }) => {
    styles[idx].active = !styles[idx].active;

    chrome.storage.local.set({
      styles,
    });
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(({ id }) => {
        chrome.tabs.sendMessage(id, styles[idx]);
      });
    });
  });

  event.target.classList.toggle("on");
};

// add the list of the items in local storage to the popup
chrome.storage.local.get("styles", ({ styles }) => {
  console.log(styles);
  styles.map((curStyleSheet, idx) => {
    const toggle = document.createElement("div");

    curStyleSheet.active
      ? toggle.classList.add("toggle", "on")
      : toggle.classList.add("toggle");

    toggle.innerText = curStyleSheet.name;
    toggle.addEventListener("click", handleToggleClick(idx));

    const deleteButton = document.createElement("button");

    deleteButton.innerHTML = "x";
    deleteButton.addEventListener("click", (event) =>
      handleDeleteClick(event, idx)
    );

    toggle.appendChild(deleteButton);

    document.body.appendChild(toggle);
  });
});
