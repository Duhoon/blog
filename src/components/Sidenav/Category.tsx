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
          <h2 onClick={toggleOpen}>{text}</h2>
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