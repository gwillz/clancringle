import { Context, createElement } from "@b9g/crank";
import { PlayerItem } from "./allocate";

type Props = {
    player: PlayerItem;
}

export function *Player(this: Context, props: Props) {

    let reveal = false;
    let timer = 0;

    const onDown = (event: Event) => {
        event.preventDefault();

        timer = setTimeout(() => {
            reveal = true;
            this.refresh();
        }, 500);
    }

    const onUp = (event: Event) => {
        event.preventDefault();

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
                <span class="player__intro">
                    Hey there <em class="text-title">{props.player.name}</em>.
                </span>
                <span class="player__help">Your cringle:</span>
                <span
                    class="player__target text-title"
                    onmousedown={onDown}
                    ontouchstart={onDown}
                    onmouseup={onUp}
                    ontouchend={onUp}
                    oncontextmenu={onContext}
                    children={reveal ? props.player.target : '****'}
                />
                <span class="player__help">Hold to reveal</span>
            </div>
        )
    }
}
