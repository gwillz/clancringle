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
            <h1>{props.setup.name}</h1>

            <div class="allocate__list">
                {props.allocations.map((player, index) => (
                    <div class="allocate__item row-item" crank-key={index}>
                        <span class="allocate__player text-title">{player.name}</span>
                        <hr/>
                        <a class="allocate__target" href={getUrl(player)} target="_blank">*****</a>
                    </div>
                ))}
            </div>

            {!!props.setup.rules.length && (
                <div>
                    <hr/>
                    <div class="rules__list">
                        {props.setup.rules.map((item, index) => (
                            <div class="setup__rule" crank-key={index}>
                                <span>
                                    <strong class="text-title">{item.from}</strong>
                                    {' '}cannot give to{' '}
                                    <strong class="text-title">{item.to}</strong>
                                    {item.bidirectional && (
                                        <em>{' '}(and vice versa)</em>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <hr/>

            <div class="toolbar">
                <button type="button" onclick={props.onReset}>Reset</button>
            </div>
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
