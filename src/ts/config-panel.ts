import { MathfieldElement } from "mathlive";
import { MathfieldOptions } from "mathlive/dist/public/options";

const FONTS_DIRECTORY = "../../../fonts";

const configPanel = document.querySelector<HTMLDivElement>(".config-panel")!;
const expandBtn = document.querySelector<HTMLButtonElement>("button.expand")!;

// setup open/close behavior
expandBtn.addEventListener("click", () => {
    configPanel.classList.toggle("config-panel--closed");
});

// configuration options needs to be filled with their math field
const configOptions = document.querySelectorAll<HTMLDivElement>(".config__option");
configOptions.forEach(option => {
    const title = new MathfieldElement();
    const field = new MathfieldElement();

    const options: Partial<MathfieldOptions> = {
        fontsDirectory: FONTS_DIRECTORY,
        virtualKeyboardMode: "off",
        locale: "fr",
    };

    title.setOptions({ ...options, readOnly: true });
    field.setOptions(options);

    title.value = option.dataset.option + " =" || "";
    field.value = option.dataset.default || "";

    option.append(title, field);
});

// nothing to export
export {};
