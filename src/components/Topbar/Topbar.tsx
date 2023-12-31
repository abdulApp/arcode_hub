import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  // console.log(router.query);

const handleProblemChange = (isForward: boolean) => {
  const currentProblem = problems[router.query.pid as string];
  const { order } = currentProblem;
  const direction = isForward ? 1 : -1;
  const nextProblemOrder = order + direction;

  const nextProblemKey = Object.keys(problems).find(
    (key) => problems[key].order === nextProblemOrder
  );

  if (!nextProblemKey) {
    const targetOrder = isForward ? 1 : Object.keys(problems).length;
    const targetProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === targetOrder
    );
    router.push(`/problems/${targetProblemKey}`);
  } else {
    router.push(`/problems/${nextProblemKey}`);
  }
};

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link href="/" className="h-[35px] flex-1">
          {/* <Image src='/arcode.png' alt='Logo' height={100} width={100} /> */}
          <p>
            <span className="text-[#ff842a] text-xl">{"<"}</span>
            <span className="border border-[#12c1ee] text-base rounded-md px-[2.5px] bg-[#12c1ee] text-black">
              AR
            </span>
            CODE_<span className="text-[#12c1ee]">HUB</span>
            <span className="text-[#ff842a] text-xl">{"/>"}</span>
          </p>
        </Link>

        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>قائمة المشاكل</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          {!user && (
            <Link
              href="/auth"
              onClick={() =>
                setAuthModalState((prev) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }))
              }
            >
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
          )}
          {user && problemPage && <Timer />}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
