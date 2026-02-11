const params = new URLSearchParams(location.search);
const id = params.get("id");

if (!id) {
  console.warn("GiftOnScreen: No gift ID in URL");
} else {
  fetch("/gifts.json")
    .then(r => r.json())
    .then(data => {
      const gift = data[id];
      if (!gift) {
        console.warn(`GiftOnScreen: Invalid gift ID ${id}`);
        return;
      }

      const receiverEl = document.getElementById("receiver");
      const messageEl  = document.getElementById("message");
      const senderEl   = document.getElementById("sender");
      const photoEl    = document.getElementById("photo");

      if (receiverEl && gift.receiver) {
        receiverEl.textContent = `For ${gift.receiver}`;
      }

      if (messageEl && gift.message) {
        messageEl.textContent = gift.message;
      }

      if (senderEl && gift.sender) {
        senderEl.textContent = `From ${gift.sender}`;
      }

      if (photoEl && gift.photo) {
        photoEl.src = `/assets/photos/${gift.photo}`;
        photoEl.alt = gift.receiver || "Gift photo";
      }
    })
    .catch(err => {
      console.error("GiftOnScreen: Failed to load gifts.json", err);
    });
}
