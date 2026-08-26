'use server'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addTeacher = async (newTeacher) => {
    const res = await fetch(`${baseURL}/teachers`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newTeacher)
    })

    return await res.json();
}