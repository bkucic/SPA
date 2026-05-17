class DualRangeSlider {
    constructor(group) {
        this.minInput = group.querySelector(".min-input");
        this.maxInput = group.querySelector(".max-input");

        this.minSlider = group.querySelector(".min-slider");
        this.maxSlider = group.querySelector(".max-slider");

        this.init();
    }

    init() {
        this.minSlider.addEventListener("input", () => {
            let min = parseFloat(this.minSlider.value);
            let max = parseFloat(this.maxSlider.value);

            if (min > max) {
                min = max;
                this.minSlider.value = max;
            }

            this.minInput.value = min;
        });

        this.maxSlider.addEventListener("input", () => {
            let min = parseFloat(this.minSlider.value);
            let max = parseFloat(this.maxSlider.value);

            if (max < min) {
                max = min;
                this.maxSlider.value = min;
            }

            this.maxInput.value = max;
        });

        this.minInput.addEventListener("change", () => {
            let min = parseFloat(this.minInput.value);
            let max = parseFloat(this.maxSlider.value);

            if (min > max) {
                min = max;
                this.minInput.value = max;
            }

            this.minSlider.value = min;
        });

        this.maxInput.addEventListener("change", () => {
            let min = parseFloat(this.minSlider.value);
            let max = parseFloat(this.maxInput.value);

            if (max < min) {
                max = min;
                this.maxInput.value = min;
            }

            this.maxSlider.value = max;
        });
    }
}


window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".range-group").forEach(group => {
        new DualRangeSlider(group);
    });
});