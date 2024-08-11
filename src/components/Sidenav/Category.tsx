import { useState, ReactNode } from "react"
import Link from "next/link"
import './sidenav.scss';

interface CategoryProps {
  link: string,
  text: string,
}

export function Category({link, text}: CategoryProps) {
  return (
      <li>
          <Link href={link}>
              <h2 className='link-text'>{text}</h2>
          </Link>
      </li>
  )
}

interface CategoryWithSubProps {
  text: string,
  children?: ReactNode,
}

export function CategoryWithSub({text, children}: CategoryWithSubProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = (e: React.MouseEvent<HTMLElement>)=>{
    console.log(isOpen);

    setIsOpen(!isOpen)
  }

  return (
      <li>
          <div className='sub-category-header' onClick={toggleOpen}>
            <h2>{text}</h2>
            {
              isOpen ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill='#fff' d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z"/></svg>
              :<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill='#fff' d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/></svg> 
            }            
          </div>
          {             
              isOpen && 
              <ul className='sub-category'>
                  {children}
              </ul>
          }
      </li>
  )
}

interface SubCategoryProps{
  link: string,
  text: string,
}

export function SubCategory({link, text}: SubCategoryProps){
  return (
      <li>
          <Link href={link}>
              <h2 className='link-text'>{text}</h2>
          </Link>
      </li>
  )
}