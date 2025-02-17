// Basic PWA: Collects name, phone, and address, stores offline, and syncs to Google Sheet

// Check if the browser supports service workers (for offline functionality)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.error("Service Worker Registration Failed:", err));
}

// Function to save data locally and sync when online
function saveData() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const entry = { name, phone, address, timestamp: new Date().toISOString() };

  // Save to LocalStorage (can be replaced with IndexedDB for larger storage)
  let storedData = JSON.parse(localStorage.getItem("offlineData")) || [];
  storedData.push(entry);
  localStorage.setItem("offlineData", JSON.stringify(storedData));

  alert("Data saved! It will sync when online.");
  syncData();
}

// Function to sync data to Google Sheets when online
async function syncData() {
  if (navigator.onLine) {
    let storedData = JSON.parse(localStorage.getItem("offlineData")) || [];
    if (storedData.length > 0) {
      for (let entry of storedData) {
        try {
          await fetch(
            `https://script.google.com/macros/s/AKfycbyo9JFDXZR956VcPPp4ASGKDNrKqXwCeMUWwmwjXBjOiuX2VlGG6yo0qaVtqjmVRJfCKA/exec`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(entry),
            }
          );
        } catch (error) {
          console.error("Sync failed:", error);
          return;
        }
      }
      localStorage.removeItem("offlineData");
      alert("All data synced successfully!");
    }
  }
}

// Sync data automatically when back online
window.addEventListener("online", syncData);

async function saveData() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const data = { name, phone, address };

  try {
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbyo9JFDXZR956VcPPp4ASGKDNrKqXwCeMUWwmwjXBjOiuX2VlGG6yo0qaVtqjmVRJfCKA/exec`,
      {
        method: "POST",
        mode: "no-cors", // This avoids CORS issues
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log("Data sent successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
