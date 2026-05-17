function updateMotor()
{
    const motor = JSON.parse(motorSelect.options[motorSelect.selectedIndex].dataset.motor);

    document.getElementById("motorVolumen").textContent = motor.volumen;
    document.getElementById("motorBrojCilindara").textContent = motor.broj_cilindara;
    document.getElementById("motorKonfiguracija").textContent = motor.konfiguracija;
}

updateMotor();
motorSelect.addEventListener("change", () => {
    updateMotor();
});

function updateGuma() 
{
    const guma = JSON.parse(gumaSelect.options[gumaSelect.selectedIndex].dataset.guma);

    document.getElementById("gumaŠirina").textContent = guma.sirina;
    document.getElementById("gumaOmjer").textContent = guma.omjer_visine_i_sirine;
    document.getElementById("gumaStruktura").textContent = guma.struktura;
    document.getElementById("gumaVelicinaKotaca").textContent = guma.velicina_kotaca;
}

updateGuma();
gumaSelect.addEventListener("change", () => {
    updateGuma();
});