"use client";

import { RefObject } from "react";
import { Categories } from "../../constatns/category";
import "./sidenav.scss";
import { Category, CategoryWithSub, SubCategory } from "./Category";

interface SidenavProps {
  wrapperRef: RefObject<HTMLDivElement>;
  sidenavRef: RefObject<HTMLUListElement>;
  lang?: string;
}

export default function Sidenav({
  wrapperRef,
  sidenavRef,
  lang,
}: SidenavProps) {
  const closeSidenav = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (wrapperRef && sidenavRef) {
      if (target.className === "link-text" || target.tagName === "A") {
        wrapperRef.current?.classList.toggle("sidenav-wrapper-open");
      }
    }
  };

  return (
    <div className={"sidenav-wrapper"} ref={wrapperRef} onClick={closeSidenav}>
      <ul className={"sidenav"} ref={sidenavRef}>
        {Categories.map((category, index) => {
          if (category.sub) {
            return (
              <CategoryWithSub key={index} text={category.name}>
                {category.sub.map((subCategory, subIndex) => (
                  <SubCategory
                    key={subIndex}
                    link={`${lang ? "/" + lang : ""}${subCategory.link}`}
                    text={subCategory.name}
                  />
                ))}
              </CategoryWithSub>
            );
          }

          return (
            <Category key={index} link={category.link} text={category.name} />
          );
        })}
      </ul>
    </div>
  );
}
