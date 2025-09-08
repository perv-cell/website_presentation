import React from "react";
import {Html} from '@react-email/html'
import './css_components/email-sender.css'


export default function Email(verificationCode){

    return (
        <Html lang="en">
            <div className="page-email">
                <div className="code-verification">
                    {`${verificationCode}`}
                </div>
            </div>
        </Html>
    )
} 
