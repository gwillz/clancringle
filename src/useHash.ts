import { Context } from "@b9g/crank";

export function useHash(context: Context) {
    let params = getParams();

    window.addEventListener('hashchange', onEvent);

    context.cleanup(() => {
        window.removeEventListener('hashchange', onEvent);
    });

    function onEvent() {
        Object.assign(params, {}, getParams());
        context.refresh();
    }

    function getParams() {
        const search = new URLSearchParams(window.location.hash.slice(1));
        const params: Record<string, string> = {};

        for (let [key, value] of search.entries()) {
            params[key] = value;
        }

        return params;
    }

    return params;
}
