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
    return { error, loading, data, run } as const;
}

async function postLogin(email: string, password: string) {
    // backend auth requires email, username and password, so username
    // is just the email again lol
    const options = {
        method: "POST",
        body: JSON.stringify({ email, password, username: email }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch("/auth/login", options)
    const data = await response.json()
    return data as string;
}

export function useLogin(email: string, password: string) {
    const { error, loading, data, run } = useRequest(() => (
        postLogin(email, password)
    ))
    return { error, loading, data, run } as const;
}
