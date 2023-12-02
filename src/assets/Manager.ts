
import { exampleType } from '../../types/types';
import { ref, readonly, watch, InjectionKey, App, inject, nextTick } from 'vue';




// Injections should always be a object


export const ExampleKey: InjectionKey<exampleType> = Symbol("Example");

const exampleCount = ref({
    count: 0
});

export function useManager(app: App) {

    app.provide(ExampleKey, exampleCount.value);
    return {}

}

export function injectStrict<T>(key: InjectionKey<T> | string): T {
    const resolved = inject(key, null);
    if (resolved === null) {
        throw new Error(`Could not resolve ${key}`);
    }
    return resolved;
}