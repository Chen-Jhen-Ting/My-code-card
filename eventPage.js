let contextMenuItem = {
  "id": "selectCode",
  "title": "複製到Code Note",
  "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == "selectCode" && clickData.selectionText) {
    chrome.storage.local.set({
      arguments: {
        selected: clickData.selectionText
      }
    });
  }
})
