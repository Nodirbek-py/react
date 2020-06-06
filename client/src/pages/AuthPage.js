import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
    const {loading, request} = useHttp()
    const [form, setForm] = useState ({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data);
            
        }
        catch(e){

        }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten your url</h1>
                <div className="card cyan lighten-4 ">
                    <div className="card-content black-text">
                        <span className="card-title">Card Title</span>
                        <div>
                        <div className="input-field">
                        <input
                        placeholder="Your email"
                        id="email" 
                        type="email"
                        name="email"
                        onChange={changeHandler}/>
                        <label htmlFor="email">Your email</label>
                        </div>
                        <div className="input-field">
                        <input
                        placeholder="Your password"
                        id="password" 
                        type="password"
                        name="password"
                        onChange={changeHandler}/>
                        <label htmlFor="password">Your email</label>
                        </div>
                        </div>
                     </div>
                    <div className="card-action">
                        <button 
                        className="btn teal lighten-5" 
                        disabled = {loading}
                        style={{marginRight:20,borderRadius: 5}}>
                            <span className="blue-text text-darken-2">Sign in</span></button>
                        <button 
                        className="btn green lighten-5" 
                        onClick = {registerHandler}
                        disabled = {loading}
                        style={{borderRadius: 5}}>
                            <span className="blue-text text-darken-2">Sign up</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}