"use client";

import {
  PageWrapper,
  BookCard,
  Menu,
  Search,
  CollectionCard,
  ReviewCard,
} from "@/components";

import style from "./page.module.css";

import background from "../../public/page-background-main.png";
import { API_URL, API_USER_ID, reviews } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { IBook, ICollection } from "@/types";
import { useAuthCheck } from "@/utils";
import { useRouter } from "next/navigation";

export default function Home() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [collections, setCollections] = useState<ICollection[]>([]);

  const [currentUserId, setCurrentUserId] = useState<string | 1>(API_USER_ID);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window ? window.localStorage.getItem("user_id") : null;
      setCurrentUserId(item ? item : API_USER_ID);
    }
  }, []);

  const router = useRouter();

  useAuthCheck(router);

  const loadCollections = useCallback(async () => {
    const collectionsResponse = await fetch(`${API_URL}/all_user_collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUserId,
      }),
    });

    const collectionsData = await collectionsResponse.json();

    console.log("collections", collectionsData.collections);

    setCollections(collectionsData.collections);
  }, [currentUserId]);

  const loadBooks = useCallback(async () => {
    const booksResponse = await fetch(`${API_URL}/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUserId,
      }),
    });

    const booksData: IBook[] = await booksResponse.json();

    console.log("data", booksData);

    setBooks(booksData);

    await loadCollections();

    // const imagesResponse = await fetch(`${API_URL}/images`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const imagesData = await imagesResponse.json();

    // console.log("images", imagesData);
  }, [currentUserId, loadCollections]);

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper backgroundSrc={background.src} className={style.page}>
      <Menu />

      <div className={style.pageContent}>
        <Search />

        <div className={style.mainContent}>
          {collections.map((collection) => (
            <CollectionCard key={collection.id} {...collection} />
          ))}

          <ReviewCard {...reviews[0]} />

          {books.map((item) => (
            <BookCard key={item.book_id} {...item} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
