'use server'

import { authClient } from "../auth-client";

const BACKEND_URL = process.env.BACKEND_URL;

export const addTeacher = async (newTeacher, token) => {
    
    const res = await fetch(`${BACKEND_URL}/teachers`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTeacher)
    })

    return await res.json();
}
