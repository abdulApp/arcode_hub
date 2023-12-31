import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import Link from "next/link";
type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;

  return (
    <div className="h-screen relative bg-gradient-to-b from-gray-600 to-black">
      <div className="max-w-7xl mx-auto">
        <Navbar />
      </div>
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <div>
          <Link href="/" className="cursor-pointer">
            <Image src="/arcode.png" alt="Hero img" height={200} width={200} />
          </Link>
        </div>
      </div>
      {authModal.isOpen && <AuthModal />}
    </div>
  );
};
export default AuthPage;
