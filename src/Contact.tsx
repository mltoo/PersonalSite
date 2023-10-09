import React from 'react';

type contact = [displayStr: string, url: string | null, icon: any]
const contacts : contact[] = [
    ['hello@alex-thomas.uk', 'mailto:hello@alexthomas.xyz', require('../res/mail.svg')],
    ['github.com/mltoo', 'https://github.com/mltoo', require('../res/github-mark.svg')],
    ['in/alexthomas-xyz', 'https://linkedin.com/in/alexthomas-xyz', require('../res/linkedin.svg')]
]

export default function Contact() {
    
    return <div className="flex flex-col text-xs leading-snug mt-5">
        {contacts.map((contact, index) => <div key={index} className="flex justify-end items-center">
                <span style={{order: 2*index}} className="px-1 place-self-baseline">
                    <a href={contact[1] ? contact[1] : contact[0]}>{contact[0]}</a>
                </span>         
                <img style={{order: 2*index+1}} className="w-2.5 h-2.5" src={contact[2]}/>
            </div>)
        }
    </div>
}
