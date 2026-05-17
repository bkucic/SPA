function getCompareList() {
    return JSON.parse(sessionStorage.getItem("compare")) || [];
}

function saveCompareList(compare) {
    sessionStorage.setItem("compare", JSON.stringify(compare));
}

function updateCompareButton(sifra) {
    const compare = getCompareList();
    const button = document.getElementById(`compare-btn-${sifra}`);

    if (!button) return;

    if (compare.includes(sifra)) {
        button.innerText = "Ukloni iz usporedbe";
        button.classList.add("remove-compare");
        button.classList.remove("add-compare");
    } else {
        button.innerText = "Dodaj za usporedbu";
        button.classList.add("add-compare");
        button.classList.remove("remove-compare");
    }
}

function toggleCompare(sifra) {
    let compare = getCompareList();

    if (compare.includes(sifra)) {
        compare = compare.filter(x => x != sifra);
    } else {
        if (compare.length >= 2) {
            //alert("Moguće je usporediti samo 2 vozila.");
            window.openWarningModal();
            return;
        }
        compare.push(sifra);
    }

    saveCompareList(compare);
    updateCompareButton(sifra);
}

function goCompare() {
    const compare = getCompareList();
    window.location = "/usporedba?sifre=" + compare.join(",");
}


window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[id^='compare-btn-']").forEach(button => {
        const sifra = button.id.replace("compare-btn-", "");
        updateCompareButton(sifra);
    });
});


window.openWarningModal = function () {
    const modal = document.getElementById("serviceModal");
    const content = document.getElementById("serviceList");

    content.innerHTML = `

                        <h2>
                          Moguće je usporediti samo 2 vozila.
                        </h2>

    `;

    modal.style.display = "flex";
};

