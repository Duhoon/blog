'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Categories } from '../../constatns/category';
import './sidenav.scss';

interface SidenavProps {
}

export default function Sidenav({}: SidenavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={'sidenav-wrapper' + (isOpen ? ' sidenav-wrapper-open' : '')}>
            <ul className={'sidenav' + (isOpen ? ' sidenav-open' : '')}>

                { 
                    Categories.map((category, index) => {
                        if ( category.name === 'Development'){
                            return (
                                <li key={index}>
                                    <Link href={category.link}>
                                        <h2>{category.name}</h2>
                                    </Link>
                                </li>
                            ) 
                        }
                        return (
                            <li key={index}>
                                <Link href={category.link}>
                                    <h2>{category.name}</h2>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <button className='button-sidenav' onClick={toggleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#000000' d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </button>
        </div>
    )
}