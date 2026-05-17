const form = document.querySelector(".main_form");
const motorSelect = document.getElementById("motorSelect");
const gumaSelect = document.getElementById("gumaSelect");

function checkCompatibility(select)
{
    const motor = JSON.parse(motorSelect.options[motorSelect.selectedIndex].dataset.motor);
    const guma = JSON.parse(gumaSelect.options[gumaSelect.selectedIndex].dataset.guma);

    const compatible = !(motor.volumen > 2000 || motor.broj_cilindara > 4) || (guma.sirina > 235 && guma.struktura === "R");
    const name = select.name;

    if(!compatible)
    {
        if(name.includes("motor"))
        {
            select.setCustomValidity("Ovaj motor nije kompatibilan s odabranim gumama");
        }
        else
        {
            select.setCustomValidity("Ove gume nisu kompatibilne s odabranim motorom");
        }
    }
    else
    {
        select.setCustomValidity("");
    }

    select.reportValidity();
    return compatible;
}

motorSelect.addEventListener("change", (e) => {
    checkCompatibility(e.target);
});

gumaSelect.addEventListener("change", (e) => {
    checkCompatibility(e.target);
});

form.addEventListener("submit", (e) => {
    const compatible = checkCompatibility(motorSelect);

    if(!compatible)
    {
        e.preventDefault();
    }
});