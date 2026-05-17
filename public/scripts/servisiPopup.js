window.openServiceModal = function (voziloId) {
    const modal =
        document.getElementById("serviceModal");

    const content =
        document.getElementById("serviceList");

    content.innerHTML =
        document.getElementById(
            `services-${voziloId}`
        ).innerHTML;

    modal.style.display = "flex";
}

function closeServiceModal() {
    document.getElementById(
        "serviceModal"
    ).style.display = "none";
}

window.addEventListener("click", (e) => {
    const modal =
        document.getElementById(
            "serviceModal"
        );

    if (e.target === modal) {
        closeServiceModal();
    }
});