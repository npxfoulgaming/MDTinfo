// Highlight current active sidebar link
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll('.sidebar a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Fetch and populate authorized officers table
fetch('../officers.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById("authorized-body");
    let total = 0;

    data.forEach(officer => {
      // Check for presence and non-empty Authorized Units, Weapons, and Date
      const hasUnits = Array.isArray(officer["Authorized Units"]) && officer["Authorized Units"].length > 0;
      const hasWeapons = Array.isArray(officer["Authorized Weapons"]) && officer["Authorized Weapons"].length > 0;
      const hasDate = typeof officer["Authorized Date"] === "string" && officer["Authorized Date"].trim() !== "";

      if (hasUnits || hasWeapons || hasDate) {
        const prefix = rankPrefixes[officer["Officer Rank"]] || "X-";
        const callsign = `${prefix}${officer.ID}`;
        const authorizedDate = hasDate ? officer["Authorized Date"] : "-";

        const weapons = hasWeapons ? officer["Authorized Weapons"].map(w => `<span class="tag">${w}</span>`).join(' ') : "";
        const units = hasUnits ? officer["Authorized Units"].map(u => `<span class="tag">${u}</span>`).join(' ') : "";

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${callsign}</td>
          <td>${officer["Officer Name"]}</td>
          <td>${authorizedDate}</td>
          <td>${weapons}</td>
          <td>${units}</td>
        `;
        tbody.appendChild(tr);
        total++;
      }
    });

    // Update total count
    const totalCount = document.getElementById('total-count');
    if (totalCount) totalCount.textContent = total;
  })
  .catch(error => console.error("Error loading authorized officers:", error));

// Guide modal handling (if present)
const guideBtn = document.getElementById('guide-btn');
const guideModal = document.getElementById('guide-modal');
const closeGuide = document.getElementById('close-guide');

if (guideBtn && guideModal && closeGuide) {
  guideBtn.addEventListener('click', () => {
    guideModal.style.display = 'block';
  });

  closeGuide.addEventListener('click', () => {
    guideModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target == guideModal) {
      guideModal.style.display = 'none';
    }
  });
}

// Prefix map (used for both roster and authorized pages)
const rankPrefixes = {
  "Cadet": "TA-",
  "Trooper": "T-",
  "Sergeant": "S-",
  "Lieutenant": "LT-",
  "Trooper 1st Class": "TF-",
  "Senior Trooper": "ST-",
  "Sergeant 1st Class": "SF-",
  "Corporal": "CO-",
  "Deputy Chief": "X-",
  "Assistant Chief": "X-",
  "Chief of Police": "X-"
  
};
