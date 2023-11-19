import { Context, createElement } from "@b9g/crank";
import { SelectField } from "./SelectField";
import { SetupOptions } from "./allocate";


type Props = {
    setup: SetupOptions;
    onSubmit: (options: SetupOptions) => void;
    onReset: () => void;
}


export function *Setup(this: Context<Props>, props: Props) {

    const players = [...props.setup.players];
    const rules = [...props.setup.rules];

    const onAddPlayer = (event: Event) => {
        const form = event.target as HTMLFormElement;
        event.preventDefault();

        const player = form.elements.namedItem('player') as HTMLInputElement;

        if (player.value) {
            players.push(player.value);
            player.value = '';
            this.refresh();
        }
    }

    const onDeletePlayer = (index: number) => {
        players.splice(index, 1);
        this.refresh();
    }

    const onAddRule = (event: Event) => {
        const form = event.target as HTMLFormElement;
        event.preventDefault();

        const from = form.elements.namedItem('from') as HTMLSelectElement;
        const to = form.elements.namedItem('to') as HTMLSelectElement;
        const bidirectional = form.elements.namedItem('bidirectional') as HTMLInputElement;

        rules.push({
            from: from.value,
            to: to.value,
            bidirectional: bidirectional.checked,
        });

        from.value = '';
        to.value = '';
        bidirectional.checked = false;
        this.refresh();
    }


    const onDeleteRule = (index: number) => {
        rules.splice(index, 1);
        this.refresh();
    }

    const onCreate = (event: Event) => {
        event.preventDefault();

        players.splice(0, players.length, ...players.filter(item => item));
        rules.splice(0, rules.length, ...rules.filter(item => item.from && item.to));

        props.onSubmit({
            name: (new Date).toLocaleDateString(),
            players: players,
            rules: rules,
        });
    }

    for (let props of this) {
        const options = [...players.entries()].map(item => [item[1], item[1]] as [string, string]);

        yield (
            <div class="setup">
                <h1>Clan Cringle: Setup</h1>

                <h2>Players</h2>
                <div class="setup__list">
                    {players.map((player, index) => (
                        <div class="setup__player" crank-key={index}>
                            <span>{player}</span>
                            <button type="button" onclick={onDeletePlayer.bind(null, index)}>Delete</button>
                        </div>
                    ))}

                    <form class="setup__player_form" onsubmit={onAddPlayer}>
                        <input
                            type="text"
                            name="player"
                        />
                        <button type="submit">Add Player</button>
                    </form>
                </div>

                <hr/>

                <h2>Exclusions</h2>
                <div class="setup__list">
                    {rules.map((item, index) => (
                        <div class="setup__rule" crank-key={index}>
                            <span>
                                <strong>{item.from}</strong>
                                {' '}cannot give to{' '}
                                <strong>{item.to}</strong>
                                {item.bidirectional && (
                                    <em>{' '}(and vice versa)</em>
                                )}
                            </span>
                            <button type="button" onclick={onDeleteRule.bind(null, index)}>Delete</button>
                        </div>
                    ))}

                    <form class="setup__rule__form" onsubmit={onAddRule}>
                        <SelectField
                            name='from'
                            options={options}
                        />
                        <SelectField
                            name='to'
                            options={options}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="bidirectional"
                            />
                            <span>Both ways?</span>
                        </label>
                        <button type="submit">Add Exclusion</button>
                    </form>
                </div>

                <hr/>

                <div>
                    <button type="button" onclick={onCreate}>Create</button>
                </div>
            </div>
        )
    }
}

