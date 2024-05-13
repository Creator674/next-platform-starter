"use client";

import { PageWrapper, Menu, CollectionCard } from "@/components";

import style from "./page.module.css";

import background from "../../../public/page-background-main.png";
import classNames from "classnames";
import { Poppins } from "@/fonts";
import { API_URL, API_USER_ID } from "@/constants";
import { ICollection } from "@/types";
import { useState, useCallback, useEffect } from "react";
import { useAuthCheck } from "../login/page";

export default function Collections() {
  const [collections, setCollections] = useState<ICollection[]>([]);
  useAuthCheck();

  const item = localStorage.getItem("user_id");
  const currentUserId: string | 1 = item ? item : API_USER_ID;

  const loadCollectionsData = useCallback(async () => {
    //change USER id to user RN
    const collectionsResponse = await fetch(`${API_URL}/all_user_collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUserId,
      }),
    });

    const collectionsData: { collections: ICollection[] } =
      await collectionsResponse.json();

    console.log("collections", collectionsData.collections);

    setCollections(collectionsData.collections);
  }, [currentUserId]);

  useEffect(() => {
    loadCollectionsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper backgroundSrc={background.src} className={style.page}>
      <Menu />

      <div className={style.pageContent}>
        <h1 className={classNames(style.pageTitle, Poppins.className)}>
          Collections
        </h1>

        <div className={style.mainContent}>
          {collections.map((item) => (
            <CollectionCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
