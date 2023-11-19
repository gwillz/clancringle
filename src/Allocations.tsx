import { Context, createElement } from "@b9g/crank";
import { PlayerItem, SetupOptions } from "./allocate";


type Props = {
    setup: SetupOptions;
    allocations: PlayerItem[];
    onReset: () => void;
}


export function Allocations(this: Context<Props>, props: Props) {
    return (
        <div class="allocations">
            <h1>Clan Cringle: {props.setup.name}</h1>

            <div class="allocate__list">
                {props.allocations.map((player, index) => (
                    <div class="allocate__item" crank-key={index}>
                        <h3>{player.name}</h3>
                        <a href={getUrl(player)} target="_blank">*****</a>
                    </div>
                ))}
            </div>
            <button type="button" onclick={props.onReset}>Reset</button>

            {!!props.setup.rules.length && (
                <div>
                    <hr/>
                    <h2>Rules</h2>

                    <div class="rules__list">
                        {props.setup.rules.map((item, index) => (
                            <div class="setup__rule" crank-key={index}>
                                <span>
                                    <strong>{item.from}</strong>
                                    {' '}cannot give to{' '}
                                    <strong>{item.to}</strong>
                                    {item.bidirectional && (
                                        <em>{' '}(and vice versa)</em>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}


function getUrl(item: PlayerItem) {
    const { protocol, host, pathname } = location;
    const params = new URLSearchParams();

    params.set('name', item.name);
    params.set('target', btoa(item.target.padEnd(10, ' ')));

    return `${protocol}//${host}${pathname}#` + params.toString();
}
