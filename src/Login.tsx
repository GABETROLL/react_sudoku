import { useState } from "react";
import { login } from "./api";


type LoginFormState = {
    name: string,
    email: string,
    password: string,
};


function isHTMLInputElement(element: HTMLElement | null): element is HTMLInputElement {
    return element !== null && Object.keys(element).includes('value');
}


function onChange(setLoginState: (state: LoginFormState) => void): void {
    const name: HTMLElement | null = document.getElementById('name');
    const email: HTMLElement | null = document.getElementById('email');
    const password: HTMLElement | null = document.getElementById('password');

    if (!isHTMLInputElement(name) || !isHTMLInputElement(email) || !isHTMLInputElement(password)) {
        console.log(`ERROR: elements with ids "name", "email" and "password" were not inputs or were null!`);
        return;
    }

    setLoginState({name: name.value, email: email.value, password: password.value});
}


export type LoginInfo = {
    playerId: string,
    sessionId: string,
};


function isLoginInfo(resJson: any): resJson is LoginInfo {
    const resJsonKeys: string[] = Object.keys(resJson);

    return (
        typeof resJson === 'object'
        && resJsonKeys.includes('playerId') && typeof resJson.playerId === 'string'
        && resJsonKeys.includes('sessionId') && typeof resJson.sessionId === 'string'
    );
}


async function onSubmit(loginState: LoginFormState, failed: () => void, succeeded: (resJson: LoginInfo) => void): Promise<void> {
    try {
        const res: Response = await login(loginState.name, loginState.email, loginState.password);

        if (res.ok) {
            const resJson: any = await res.json();

            if (isLoginInfo(resJson)) {
                return succeeded(resJson);
            }
        }
    } catch (error) {

    }

    failed();
}


export default function Login({failed, succeeded}: {failed: () => void, succeeded: (resJson: LoginInfo) => void}) {
    const [loginState, setLoginState]: [LoginFormState, (state: LoginFormState) => void] = useState({name: '', email: '', password: ''});

    return (
        <>
            <header>
                <h1>Login</h1>
            </header>
            <form className="menu">
                <label htmlFor="name">Name</label>
                <input id="name" type="name" value={loginState.name} onChange={() => onChange(setLoginState)} />
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={loginState.email} onChange={() => onChange(setLoginState)} />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={loginState.password} onChange={() => onChange(setLoginState)} />
                <button onClick={() => { onSubmit(loginState, failed, succeeded); }}>Submit</button>
            </form>
        </>
    );
}
