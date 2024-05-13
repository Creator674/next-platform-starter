"use client";

import { PageWrapper, BookCard, Menu } from "@/components";

import style from "./page.module.css";

import background from "../../../public/page-background-main.png";
import { IBook } from "@/types";
import classNames from "classnames";
import { Poppins } from "@/fonts";

const cards: IBook[] = [
  {
    id: 1,
    name: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    description:
      "A Gothic novel that tells the story of Dorian Gray, a man who remains eternally youthful while a portrait of him ages and reflects his sins.",
    rating: 4.7,
  },
  {
    id: 2,
    name: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A philosophical novel that follows the journey of a young shepherd named Santiago as he seeks his personal legend and discovers the meaning of life.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    description:
      "A series of fantasy novels that transport readers to the magical world of Narnia, where they embark on adventures with various characters.",
    rating: 4.8,
  },
  {
    id: 4,
    name: "The Kite Runner",
    author: "Khaled Hosseini",
    description:
      "A powerful story that explores friendship, betrayal, and redemption against the backdrop of Afghanistan's tumultuous history.",
    rating: 4.6,
  },
  {
    id: 5,
    name: "The Hunger Games",
    author: "Suzanne Collins",
    description:
      "A dystopian trilogy set in a post-apocalyptic society where teenagers are forced to participate in a televised fight to the death.",
    rating: 4.4,
  },
  {
    id: 6,
    name: "The Da Vinci Code",
    author: "Dan Brown",
    description:
      "A thrilling mystery novel that follows a symbologist and a cryptologist as they unravel clues and secrets to solve a centuries-old mystery.",
    rating: 4.3,
  },
];

export default function Favourites() {
  return (
    <PageWrapper backgroundSrc={background.src} className={style.page}>
      <Menu />

      <div className={style.pageContent}>
        <h1 className={classNames(style.pageTitle, Poppins.className)}>
          Мои любимые книги
        </h1>

        <div className={style.mainContent}>
          {cards.map((item) => (
            <BookCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
