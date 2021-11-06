const replacerInput = document.querySelector("#text-replacer");

const browser = window.browser ? window.browser : window.chrome;

const myPort = browser.runtime.connect({ name: "fkfagent-port" });

function updateReplaceTextOnActiveTab(replaceText) {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      replaceText: replaceText,
    });
  });
}

replacerInput.addEventListener("input", () => {
  browser.storage.sync.set({
    replaceText: replacerInput.value,
  });
  updateReplaceTextOnActiveTab(replacerInput.value);
});

browser.storage.sync.get("replaceText").then((res) => {
  replacerInput.value = res.replaceText;
  updateReplaceTextOnActiveTab(replacerInput.value);
});
