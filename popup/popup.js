const handleDeleteClick = (event, idx) => {
  event.stopPropagation();

  chrome.storage.local.get("styles", ({ styles }) => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(({ id }) => {
        chrome.tabs.sendMessage(id, { ...styles[idx], active: false });
      });

      styles.splice(idx, 1);

      chrome.storage.local.set({
        styles,
      });
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

  event.target.classList.toggle("bi-toggle-on");
  event.target.classList.toggle("bi-toggle-off");
};

// add the list of the items in local storage to the popup
chrome.storage.local.get("styles", ({ styles }) => {
  styles.map((curStyleSheet, idx) => {
    // outer box for putting the toggle button and delete and whatever else in
    const container = document.createElement("div");

    container.classList.add(
      "d-flex",
      "text-nowrap",
      "align-items-center",
      "text-white",
      "m-2",
      "justify-content-between"
    );
    container.innerText = curStyleSheet.name;

    // button for turning the style off or on
    const toggle = document.createElement("i");
    toggle.classList.add(
      "cursor-pointer",
      "mx-1",
      "text-black",
      curStyleSheet.active ? "bi-toggle-on" : "bi-toggle-off"
    );

    // toggle.innerText = curStyleSheet.name;
    toggle.addEventListener("click", handleToggleClick(idx));

    // button for deleting the style
    const deleteButton = document.createElement("i");

    deleteButton.classList.add("bi-x-square", "cursor-pointer");
    deleteButton.addEventListener("click", (event) =>
      handleDeleteClick(event, idx)
    );

    container.appendChild(toggle);
    container.appendChild(deleteButton);
    document.body.appendChild(container);
  });
});
