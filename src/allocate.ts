
const DEBUG = import.meta.env.DEV;


export interface PlayerItem {
    name: string;
    target: string;
}


export interface Rule {
    from: string;
    to: string;
    bidirectional: boolean;
}


export interface SetupOptions {
    name: string;
    players: string[];
    rules: Rule[];
}


export const EMPTY_SETUP: SetupOptions = {
    name: '',
    players: [],
    rules: [],
}


export function allocate(props: SetupOptions, iterations = 50) {

    iterations += props.players.length;

    for (let i = 0; i < iterations; i++) {
        try {
            return allocateOnce(props.players, props.rules);
        }
        catch (e) {}
    }

    throw new Error('Cannot allocate players');
}


export function allocateOnce(players: string[], rules: Rule[]) {

    DEBUG && console.log('Players: ' + players.length);
    DEBUG && console.log('Rules: ' + rules.length);

    const items: PlayerItem[] = [];
    const options = players.slice(0);

    for (let name of players) {
        const exclude: string[] = [];
        exclude.push(name);

        for (let rule of rules) {
            if (rule.from === name) {
                exclude.push(rule.to);
            }

            if (rule.bidirectional && rule.to === name) {
                exclude.push(rule.from);
            }
        }

        const subOptions = options.filter((item) => !exclude.includes(item));

        DEBUG && console.log(`player: ${name}: ` + subOptions.join(', '));

        if (subOptions.length === 0) {
            throw new Error('Cannot allocate player: ' + name);
        }

        const index = Math.floor(Math.random() * subOptions.length);
        const target = subOptions[index]

        DEBUG && console.log(`=> ${target}`);

        items.push({ name, target });
        options.splice(options.indexOf(target), 1);
    }

    return items;
}

