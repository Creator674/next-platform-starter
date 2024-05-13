"use client";

import { PageWrapper, Menu } from "@/components";

import style from "./page.module.css";

import background from "../../../public/page-background-main.png";
import classNames from "classnames";
import { Poppins } from "@/fonts";
import ChallengeForm from "@/components/ChallengeForm/ChallengeForm";
import { useCallback, useEffect, useState } from "react";
import { API_URL, API_USER_ID } from "@/constants";
import { useAuthCheck } from "@/utils";
import { useRouter } from "next/navigation";

export default function Challenge() {
  const [challenge, setChallenge] = useState<{
    book_read: number;
    book_want: number;
    challenge_id: number;
  } | null>(null);
  const [isChallengeFormVisible, setIsChallengeFormVisible] =
    useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | number>(
    API_USER_ID
  );

  const router = useRouter();

  useAuthCheck(router);

  if (typeof window !== "undefined") {
    const item = window.localStorage.getItem("user_id");
    const currentUserId: string | 1 = item ? item : API_USER_ID;
    setCurrentUserId(currentUserId);
  }

  const loadUserChallenge = useCallback(async () => {
    const challengeResponse = await fetch(`${API_URL}/book_challenge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUserId,
      }),
    });

    const challengeData: {
      success: boolean;
      book_read: number;
      book_want: number;
      challenge_id: number;
    } = await challengeResponse.json();

    console.log("challengeData", challengeData.success);

    if (challengeData.success) {
      setChallenge(challengeData);
    }
  }, [currentUserId]);

  useEffect(() => {
    loadUserChallenge();
  }, [loadUserChallenge]);

  return (
    <PageWrapper backgroundSrc={background.src} className={style.page}>
      <Menu />

      <div className={style.pageContent}>
        <h1 className={classNames(style.pageTitle, Poppins.className)}>
          One year challenge
        </h1>

        <div className={style.mainContent}>
          <div className={style.challenge}>
            <div className={classNames(style.formTitle, style.titleOfForm)}>
              <h2 className={classNames(style.formHeaders, Poppins.className)}>
                Track your reading activity
              </h2>
            </div>
            <p className={classNames(style.consistency, Poppins.className)}>
              Good job! Consistency is the key!
            </p>
            {challenge &&
              (challenge.book_read > challenge.book_want ||
                challenge.book_want === 0 ||
                isChallengeFormVisible) && (
                <ChallengeForm
                  onSuccess={(want) => {
                    setChallenge({
                      ...challenge,
                      book_want: want,
                    });
                    setIsChallengeFormVisible(false);
                  }}
                />
              )}

            <div className={style.infoWrapper}>
              {" "}
              <div className={style.infoContainer}>
                <p className={classNames(style.bookInfo, Poppins.className)}>
                  Already read
                </p>
                <p className={classNames(style.bookInfo, Poppins.className)}>
                  {challenge?.book_read}
                </p>
              </div>
              <div className={style.infoContainer}>
                <p className={classNames(style.bookInfo, Poppins.className)}>
                  Your goal
                </p>
                <p className={classNames(style.bookInfo, Poppins.className)}>
                  {challenge?.book_want}
                </p>
              </div>{" "}
            </div>
            <button
              className={classNames(
                style.challengeSendButton,
                Poppins.className
              )}
              onClick={() => setIsChallengeFormVisible(true)}
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
