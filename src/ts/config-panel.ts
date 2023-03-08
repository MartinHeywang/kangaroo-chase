import { ComputeEngine } from "@cortex-js/compute-engine";
import { MathfieldElement } from "mathlive";
import { MathfieldOptions } from "mathlive/dist/public/options";
import { setConfig } from "./config";

const FONTS_DIRECTORY = "../../../fonts";

const configPanel = document.querySelector<HTMLDivElement>(".config-panel")!;
const expandBtn = document.querySelector<HTMLButtonElement>("button.expand")!;

// setup open/close behavior
expandBtn.addEventListener("click", () => {
    configPanel.classList.toggle("config-panel--closed");
});

// configuration options needs to be filled with their math field
const configOptions = document.querySelectorAll<HTMLDivElement>(".config__option");

const nameToLatexMap = {
    "s": "s",
    "deltaT": "{\\Delta}t"
}

configOptions.forEach(option => {
    const title = new MathfieldElement();
    const field = new MathfieldElement();

    const sharedOptions: Partial<MathfieldOptions> = {
        fontsDirectory: FONTS_DIRECTORY,
        virtualKeyboardMode: "off",
        locale: "fr",
    };

    const computeEngine = new ComputeEngine();
    title.setOptions({ ...sharedOptions, readOnly: true });
    field.setOptions({ ...sharedOptions, computeEngine });

    type index = keyof typeof nameToLatexMap;
    title.value = nameToLatexMap[option.dataset.option! as index] + " =" || "";
    field.value = option.dataset.default || "";

    computeEngine.numericMode = "machine";
    field.addEventListener("change", () => {
        const expression = computeEngine.parse(field.value);
        const value = expression.N().numericValue as number | null;
        
        // error in the input -> for example the user entered a letter
        if(value == null || isNaN(value)) {
            option.classList.add("config__option--incorrect");
            return;
        }

        setConfig({ [option.dataset.option!]: value });
        option.classList.remove("config__option--incorrect");
    })

    option.append(title, field);
});

// nothing to export
export {};
