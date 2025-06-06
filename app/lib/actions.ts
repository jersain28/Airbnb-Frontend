'use server';

import { cookies } from "next/headers";

export async function handleRefresh() {
    console.log('handleRefresh');
    const refreshToken=await getRefreshToken();
    const token=await fetch('http://localhost:8000/api/auth/token/refresh/',{
        method:'POST',
        body:JSON.stringify({
            refresh:refreshToken
        }),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(async (json)=> {
            console.log('Response - Refresh:', json);
            if (json.access) {
                (await cookies()).set('session_access_token', json.access,{
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60, 
                    path: '/'
                });

                return json.access;
            } else {
                resetAuthCookies();
            }
        })
        .catch((error)=>{
            console.log('error', error);
            resetAuthCookies();
        });

    return token;
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    (await cookies()).set('session_userid', userId,{
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, 
        path: '/'
    });
    (await cookies()).set('session_access_token', accessToken,{
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60, 
        path: '/'
    });
    (await cookies()).set('session_refresh_token', refreshToken,{
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, 
        path: '/'
    });
    
}

export async function resetAuthCookies() {
    (await cookies()).set('session_userid','');
    (await cookies()).set('session_access_token','');
    (await cookies()).set('session_refresh_token','');
}

//
// Get Data

export async function getUserId(){
    const userId = (await cookies()).get('session_userid')?.value;
    return userId ? userId : null
}

export async function getAccessToken() {
    let accessToken=(await cookies()).get('session_access_token')?.value;

    if(!accessToken) {
        accessToken=await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    let refreshToken=(await cookies()).get('session_refresh_token')?.value;
    return refreshToken;
}