
export function useLocal<T>(key: string, init: T) {
    const blob = localStorage.getItem(key);

    if (blob) {
        init = JSON.parse(blob);
    }
    else {
        if (Array.isArray(init)) {
            // @ts-expect-error
            init = [...init];
        }
        else if (init && typeof init === 'object') {
            init = {...init};
        }
        else {
            init = init;
        }
    }

    const ref = {
        value: init,
        commit() {
            const blob = JSON.stringify(ref.value);
            localStorage.setItem(key, blob);
        }
    }

    return ref;
}
