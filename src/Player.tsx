import { Context, createElement } from "@b9g/crank";
import { PlayerItem } from "./allocate";

type Props = {
    player: PlayerItem;
}

export function *Player(this: Context, props: Props) {

    let reveal = false;
    let timer = 0;

    const onDown = (event: Event) => {
        timer = setTimeout(() => {
            reveal = true;
            this.refresh();
        }, 500);
    }

    const onUp = (event: Event) => {
        reveal = false;
        clearTimeout(timer);
        this.refresh();
    }

    const onContext = (event: Event) => {
        event.preventDefault();
    }

    for (let props of this) {
        yield (
            <div class="player">
                <h2>Hey there {props.player.name}, your cringle is:</h2>

                <h1 onmousedown={onDown} onmouseup={onUp} oncontextmenu={onContext}>
                    {reveal ? props.player.target : 'Hold to Reveal'}
                </h1>
            </div>
        )
    }
}
