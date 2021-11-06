const tagForRemoving = ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6"];

let replaceText;

browser.storage.sync.get("replaceText").then((res) => {
  replaceText = res.replaceText;
});

function replaceFoundedMessage(message) {
  const nodes = document.body.querySelectorAll(tagForRemoving.join(", "));
  nodes.forEach((n) => {
    const isHiddenMsg = n.innerText.toLowerCase().match(message.toLowerCase());

    if (!isHiddenMsg) {
      return;
    }

    n.innerText = replaceText;
  });
}

function replaceFoundedMessages(messages) {
  messages.forEach((m) => {
    replaceFoundedMessage(m);
  });
}

const msgs = ["функции иностранного агента"];

const MutationObserver =
  window.MutationObserver || window.WebKitMutationObserver;

const observer = new MutationObserver(() => {
  if (replaceText === undefined) {
    return;
  }
  replaceFoundedMessages(msgs);
});

observer.observe(document, {
  subtree: true,
  childList: true,
});

browser.runtime.onMessage.addListener((message) => {
  repalceText = message.replaceText;
});
