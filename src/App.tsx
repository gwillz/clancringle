import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";
import { Allocations } from "./Allocations";
import { Setup } from "./Setup";
import { EMPTY_SETUP, PlayerItem, SetupOptions, allocate } from "./allocate";
import { useLocal } from "./useLocal";
import { useHash } from "./useHash";


export function *App(this: Context) {

    const params = useHash(this);
    const setup = useLocal('cc:setup', EMPTY_SETUP);
    const allocations = useLocal<PlayerItem[]>('cc:allocations', []);

    const onSubmit = (value: SetupOptions) => {
        try {
            setup.value = value;
            setup.commit();

            allocations.value = allocate(setup.value);
            allocations.commit();
        }
        catch (error: any) {
            alert(error.message);
        }

        this.refresh();
    }

    const onResetSetup = () => {
        if (confirm('Are you sure? This will destroy all data.')) {
            setup.value = EMPTY_SETUP;
            allocations.value = [];

            setup.commit();
            allocations.commit();
            this.refresh();
        }
    }

    const onResetAllocations = () => {
        if (confirm('Are you sure? This will destroy allocations.')) {
            allocations.value = [];
            allocations.commit();
            this.refresh();
        }
    }

    for (let {} of this) {
        const name = (params.name ?? '').trim();
        const target = atob(params.target ?? '').trim();

        yield (
            <div class="container">
                { target && name ? (
                    <Player
                        player={{ name, target }}
                    />
                ) : allocations.value.length ? (
                    <Allocations
                        setup={setup.value}
                        allocations={allocations.value}
                        onReset={onResetAllocations}
                    />
                ) : (
                    <Setup
                        setup={setup.value}
                        onSubmit={onSubmit}
                        onReset={onResetSetup}
                    />
                )}
            </div>
        )
    }
}
