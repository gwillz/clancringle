import { Context, createElement } from "@b9g/crank";

type Props = {
    class?: string;
    name?: string;
    value?: string;
    onchange?: (event: Event) => void;
    options: [string, string][];
}

export function *SelectField(this: Context, props: Props) {
    return (
        <select
            class={props.class}
            name={props.name}
            onchange={props.onchange}
        >
            <option
                value=''
                children='Select...'
            />
            {[...props.options].map(([value, label], index) => (
                <option
                    crank-key={value + ':' + index}
                    value={value}
                    selected={value === props.value}
                    children={label}
                />
            ))}
        </select>
    )
}
