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
