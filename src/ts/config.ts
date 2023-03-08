import * as simulation from "./simulation";
import * as view from "./view";

interface Config {
    s: number;
    deltaT: number;
}

export function setConfig(partial: Partial<Config>) {
    config = { ...config, ...partial };

    simulation.compute();
    view.update();
}

export let config: Config = {
    s: 2,
    deltaT: 1,
};
