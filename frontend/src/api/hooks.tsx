import { useRequest } from 'ahooks'
import { TestWord } from './interfaces';

async function loadTestHello() {
    const response = await fetch('/api/hello')
    const data = await response.json();
    return { word: data } as TestWord;
}

export function useTestHello() {
    const { error, loading, data, run } = useRequest(() =>
        loadTestHello(),
    )
    return { error, loading, data, run } as const
}
