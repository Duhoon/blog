'use client';

import { ReactNode, Ref } from 'react';
import Link from 'next/link';
import { Categories } from '../../constatns/category';
import './sidenav.scss';

interface SidenavProps {
    wrapperRef: Ref<any>,
    sidenavRef: Ref<any>,
}

export default function Sidenav({wrapperRef, sidenavRef}: SidenavProps) {
    const closeSidenav = ()=>{
        if ( wrapperRef && sidenavRef){
            (wrapperRef as any).current?.classList.toggle('sidenav-wrapper-open');
            (sidenavRef as any).current?.classList.toggle('sidenav-open');
        }
    }

    return (
        <div className={'sidenav-wrapper'} ref={wrapperRef} onClick={closeSidenav}>
            <ul className={'sidenav'} ref={sidenavRef}>
                { 
                    Categories.map((category, index) => {
                        if (category.sub) {
                            return (
                                <Category key={index} link={category.link} text={category.name}>
                                    {
                                        category.sub.map((subCategory, subIndex)=>
                                            (<SubCategory key={subIndex} link={subCategory.link} text={subCategory.name} />)
                                        )
                                    }
                                </Category>
                            )
                        }

                        return (
                            <Category key={index} link={category.link} text={category.name}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}

interface CategoryProps {
    link: string,
    text: string,
    children?: ReactNode,
}

function Category({link, text, children}: CategoryProps) {
    return (
        <li>
            <Link href={link}>
                <h2>{text}</h2>
            </Link>
            {
                children?             
                    <ul className='sub-category'>
                        {children}
                    </ul>
                : null
            }

        </li>
    )
}

interface SubCategoryProps{
    link: string,
    text: string,
}

function SubCategory({link, text}: SubCategoryProps){
    return (
        <li>
            <Link href={link}>
                <h2>{text}</h2>
            </Link>
        </li>
    )
}