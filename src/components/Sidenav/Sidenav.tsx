'use client';

import { Ref } from 'react';
import { Categories } from '../../constatns/category';
import './sidenav.scss';
import { Category, CategoryWithSub, SubCategory } from './Category';

interface SidenavProps {
    wrapperRef: Ref<any>,
    sidenavRef: Ref<any>,
}

export default function Sidenav({wrapperRef, sidenavRef}: SidenavProps) {
    const closeSidenav = (e: React.MouseEvent<HTMLElement>)=>{
        const target = e.target as HTMLElement

        if ( wrapperRef && sidenavRef){
            if ( target.className === 'link-text' || target.tagName === 'A' ){
                (wrapperRef as any).current?.classList.toggle('sidenav-wrapper-open');
            }
        }
    }

    return (
        <div className={'sidenav-wrapper'} ref={wrapperRef} onClick={closeSidenav}>
            <ul className={'sidenav'} ref={sidenavRef}>
                { 
                    Categories.map((category, index) => {
                        if (category.sub) {
                            return (
                                <CategoryWithSub key={index} text={category.name}>
                                    {
                                        category.sub.map((subCategory, subIndex)=>
                                            (<SubCategory key={subIndex} link={subCategory.link} text={subCategory.name} />)
                                        )
                                    }
                                </CategoryWithSub>
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