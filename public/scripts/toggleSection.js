function toggleSection(id, buttonId) {

  const section = document.getElementById(id);
  const button = document.getElementById(buttonId);

  if (section.style.display === "none") {
    section.style.display = "block";
    button.textContent = "-";
  } else {
    section.style.display = "none";
    button.textContent = "+";
  }
}

document.addEventListener("DOMContentLoaded", () => {

    function hasValue(selector) {

        const el = document.querySelector(selector);

        if (!el) return false;

        if (el.type === "checkbox") {
            return el.checked;
        }

        return el.value && el.value.trim() !== "";
    }

    function anyInSection(selectors) {
        return selectors.some(sel => hasValue(sel));
    }

    // VOZILO FILTERS
    if (
        anyInSection([
            'input[name="search"]',
            'input[name="boja"]:checked',
            'input[name="oblik"]:checked'
        ])
    ) {
        toggleSection("voziloFilters", "toggle-btn-vozilo");
    }

    // MOTOR FILTERS
    if (
        anyInSection([
            'input[name="search_engine"]',
            'input[name="konfiguracija"]:checked',
            'input[name="minVolumen"]',
            'input[name="maxVolumen"]',
            'input[name="minCilindar"]',
            'input[name="maxCilindar"]'
        ])
    ) {
        toggleSection("motorFilters", "toggle-btn-motor");
    }

    // GUMA FILTERS
    if (
        anyInSection([
            'input[name="search_tire"]',
            'input[name="struktura"]:checked',
            'input[name="minSirina"]',
            'input[name="maxSirina"]',
            'input[name="minOmjer"]',
            'input[name="maxOmjer"]',
            'input[name="minVelicina"]',
            'input[name="maxVelicina"]'
        ])
    ) {
        toggleSection("gumaFilters", "toggle-btn-guma");
    }
});