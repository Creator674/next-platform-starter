"use client";

import { FC } from "react";
import Image from "next/image";
import style from "./Search.module.css";

import searchIcon from "../../../public/search-glass.svg";

export interface SearchProps {}

export const Search: FC<SearchProps> = ({}) => {
  return (
    <div className={style.search}>
      <Image className={style.searchIcon} src={searchIcon} alt="search" />

      {/* <input className={style.searchInput} type="text" /> */}
    </div>
  );
};
