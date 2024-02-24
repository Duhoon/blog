import Link from 'next/link';
import { Categories } from '../../constatns/category';
import './sidenav.scss';

interface SidenavProps {
    isSidenavOpen: boolean;
}

export default function Sidenav({isSidenavOpen}: SidenavProps) {
    return (
        <ul className={'sidenav' + (isSidenavOpen ? ' sidenav-open' : '')}>
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
    )
}