// Highlight the current sidebar link
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll('.sidebar a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Mapping rank to prefix
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

// Load and render officers
fetch('../officers.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load officers.json");
    return response.json();
  })
  .then(data => {
    const tbody = document.getElementById("roster-body");
    let sasp = 0, bcso = 0, sahp = 0;

    data.forEach(officer => {
      const prefix = rankPrefixes[officer["Officer Rank"]] || "X-";
      const callsign = `${prefix}${officer.ID}`;
      const department = officer.Department.toUpperCase();
      const status = officer.Status.toLowerCase().replace(/\s/g, "-");

      // Count departments
      if (department === "SASP") sasp++;
      else if (department === "BCSO") bcso++;
      else if (department === "SAHP") sahp++;

      // Create table row
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${callsign}</td>
        <td>${officer["Officer Name"]}</td>
        <td>${officer["Officer Rank"]}</td>
        <td>${officer.Department}</td>
        <td>
          <span class="status ${status}">
            <span class="status-dot ${status}"></span>
            ${officer.Status}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Update counts
    document.getElementById('sasp-count').textContent = sasp;
    document.getElementById('bcso-count').textContent = bcso;
    document.getElementById('sahp-count').textContent = sahp;
    document.getElementById('total-count').textContent = data.length;
  })
  .catch(error => {
    console.error("Error loading roster:", error);
    document.getElementById("roster-body").innerHTML = `<tr><td colspan="5">Failed to load roster data.</td></tr>`;
  });
