import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
type ProblemsCardProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsCard: React.FC<ProblemsCardProps> = ({ setLoadingProblems }) => {
  const problems = useGetProblems(setLoadingProblems);
  const solvedProblems = useGetSolvedProblems();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="text-sm text-right flex flex-wrap justify-around text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
      {problems.map((problem) => (
        <div key={problem.id} className="w-full sm:w-1/3 p-2">
          <ProblemCard
            problem={problem}
            isSolved={solvedProblems.includes(problem.id)}
          />
        </div>
      ))}
    </div>
  );
};

type ProblemCardProps = {
  problem: DBProblem;
  isSolved: boolean;
};

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, isSolved }) => {
  const [youtubePlayer, setYoutubePlayer] = useState<{
    isOpen: boolean;
    videoId: string;
  }>({
    isOpen: false,
    videoId: "",
  });

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  const openYoutubePlayer = (videoId: string) => {
    setYoutubePlayer({ isOpen: true, videoId });
  };

  const difficulyColor =
    problem.difficulty === "Easy"
      ? "text-dark-green-s"
      : problem.difficulty === "Medium"
      ? "text-dark-yellow"
      : "text-dark-pink";

  return (
    <>
      <div
        className={`rounded-lg h-[220px] w-[238px] p-2 border relative ${
          isSolved ? "border-green-500" : "border-gray-300"
        } transition duration-300`}
      >
        <Link
          href={problem.link ? problem.link : `/problems/${problem.id}`}
          className="block cursor-pointer"
          target={problem.link ? "_blank" : ""}
          dir="rtl"
        >
          <div
            className={`rounded-lg p-4 border ${
              isSolved ? "border-green-500" : "border-gray-300"
            } transition duration-300 hover:bg-blue-900 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-dark-green-s">{problem.title}</h3>
              {isSolved && (
                <BsCheckCircle
                  fontSize="18"
                  width="18"
                  className="text-green-500"
                />
              )}
            </div>
            <div className="mt-2 text-gray-600 dark:text-gray-400">
              {problem.category}
            </div>
            {problem.difficulty === "Easy" ? (
              <div className="text-dark-green-s">سهل</div>
            ) : problem.difficulty === "Medium" ? (
              <div className="text-dark-yellow">متوسط</div>
            ) : (
              <div className="text-dark-pink">صعب</div>
            )}
          </div>
        </Link>
        <div
          className="border p-2 mt-2 rounded-lg flex justify-between absolute bottom-0 left-0 w-full mx-auto"
          dir="rtl"
        >
          <p>الحل:</p>
          {problem.videoId ? (
            <AiFillYoutube
              fontSize={"28"}
              className="cursor-pointer hover:text-red-600"
              onClick={() => openYoutubePlayer(problem.videoId as string)}
            />
          ) : (
            <p className="text-gray-400">قريبا</p>
          )}
        </div>
      </div>
      {youtubePlayer.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModal}
          ></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <IoClose
                  fontSize={"35"}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={closeModal}
                />
                <YouTube
                  videoId={youtubePlayer.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};

export default ProblemsCard;

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      // fetching data logic
      setLoadingProblems(true);
      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);
      const tmp: DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      setProblems(tmp);
      setLoadingProblems(false);
    };

    getProblems();
  }, [setLoadingProblems]);
  return problems;
}
//
function useGetSolvedProblems() {
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setSolvedProblems(userDoc.data().solvedProblems);
      }
    };

    if (user) getSolvedProblems();
    if (!user) setSolvedProblems([]);
  }, [user]);

  return solvedProblems;
}
function closeModal() {
  throw new Error("Function not implemented.");
}
