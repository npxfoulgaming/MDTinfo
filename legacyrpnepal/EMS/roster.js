// Highlight the current sidebar link
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll('.sidebar a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// EMS rank-to-callsign prefix mapping
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

// Load and display EMS roster
fetch('../ems.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load ems.json");
    return response.json();
  })
  .then(data => {
    const tbody = document.getElementById("roster-body");
    let emsCount = 0;
    let bcfdCount = 0;

    data.forEach(member => {
      const prefix = rankPrefixes[member["Officer Rank"]] || "X-";
      const callsign = `${prefix}${member.ID}`;
      const statusClass = member.Status.toLowerCase().replace(/\s/g, "-");

      if (member.Department.toUpperCase() === "EMS") emsCount++;
      if (member.Department.toUpperCase() === "BCFD") bcfdCount++;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${callsign}</td>
        <td>${member["Officer Name"]}</td>
        <td>${member["Officer Rank"]}</td>
        <td>${member.Department}</td>
        <td>
          <span class="status ${statusClass}">
            <span class="status-dot ${statusClass}"></span>
            ${member.Status}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Update total counts
    document.getElementById('ems-count').textContent = emsCount;
    document.getElementById('bcfd-count').textContent = bcfdCount;
    document.getElementById('total-count').textContent = data.length;
  })
  .catch(error => {
    console.error("Error loading EMS roster:", error);
    document.getElementById("roster-body").innerHTML =
      `<tr><td colspan="5">Failed to load EMS roster data.</td></tr>`;
  });
