// Highlight current active sidebar link
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll('.sidebar a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Fetch and populate EMS authorized personnel table
fetch('../ems.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById("authorized-body");
    let total = 0;

    data.forEach(officer => {
      const hasUnits = Array.isArray(officer["Authorized Units"]) && officer["Authorized Units"].length > 0;
      const hasEquipment = Array.isArray(officer["Authorized Weapons"]) && officer["Authorized Weapons"].length > 0;
      const hasDate = typeof officer["Authorized Date"] === "string" && officer["Authorized Date"].trim() !== "";

      if (hasUnits || hasEquipment || hasDate) {
        const prefix = rankPrefixes[officer["Officer Rank"]] || "EMS-";
        const callsign = `${prefix}${officer.ID}`;
        const authorizedDate = hasDate ? officer["Authorized Date"] : "-";

        const equipment = hasEquipment ? officer["Authorized Weapons"].map(w => `<span class="tag">${w}</span>`).join(' ') : "";
        const units = hasUnits ? officer["Authorized Units"].map(u => `<span class="tag">${u}</span>`).join(' ') : "";

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${callsign}</td>
          <td>${officer["Officer Name"]}</td>
          <td>${authorizedDate}</td>
          <td>${equipment}</td>
          <td>${units}</td>
        `;
        tbody.appendChild(tr);
        total++;
      }
    });

    const totalCount = document.getElementById('total-count');
    if (totalCount) totalCount.textContent = total;
  })
  .catch(error => console.error("Error loading EMS authorized list:", error));

// Guide modal handling
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

// EMS Rank Prefixes
const rankPrefixes = {
  "Chairman": "CH-",
  "Director": "X-",
  "Deputy Director": "X-",
  "Asst. Director": "X-",
  "Suoervisor": "Z-",
  "Captain": "C-",
  "Lieutenant": "LT-",
  "Sergeant 1st Class": "SF-",
  "Sergeant": "S-",
  "Senior Specialist": "SP-",
  "Specialist": "P-",
  "Senior Paramedic": "SD-",
  "Paramedic": "D-",
  "EMT": "E-"
};
