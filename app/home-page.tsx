"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import HomeLayout from "../layouts/HomeLayout";
import Modal from "../components/Home/Modal";
import Banner from "../components/Home/Banner";
import VerseOfDay from "../components/Home/VerseOfDay";
import Newsletter from "../components/Home/Newsletter";
import Chapters from "../components/Home/Chapters";
export default function HomePage({ chapters }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const pathName = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const access_token = pathName?.match(/\#(?:access_token)\=([\S\s]*?)\&/);

    if (access_token && access_token.length > 1) {
      // @ts-ignore
      setCookie("Token", access_token[1]);
    }
  }, [pathName, setCookie]);
  function handleSubscribe(e, formData) {
    e.preventDefault();
    if (formData.name && formData.email) {
      // todo call newsletter subscribe API
      setModalVisible(true);
      return true;
    } else return false;
  }

  return (
    <div className="font-inter min-h-screen dark:bg-dark-bg">
      <main>
        <HomeLayout>
          <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <Banner />
          <VerseOfDay />
          <Newsletter handleSubscribe={handleSubscribe} />
          <Chapters chapters={chapters} />
        </HomeLayout>
      </main>
    </div>
  );
}
