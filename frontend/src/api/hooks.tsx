import { useRequest } from 'ahooks'
import { TestWord } from './interfaces';

async function postLogin(email: string, password: string) {
    const options = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch("/auth/login", options)
    const data = await response.json()
    return data["token"] as string;
}
export function useLogin(email: string, password: string) {
    const { error, loading, data, run } = useRequest(() => (
        postLogin(email, password)
    ))
    return { error, loading, data, run } as const;
}

async function loadTestHello() {
    const response = await fetch('/api/hello')
    const data = await response.json();
    return { word: data } as TestWord;
}
export function useTestHello() {
    const { error, loading, data, run } = useRequest(() =>
        loadTestHello(),
    )
    return { error, loading, data, run } as const;
}

