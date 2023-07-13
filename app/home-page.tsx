"use client";

import { FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import HomeLayout from "../layouts/HomeLayout";
import Modal from "../components/Home/Modal";
import Banner from "../components/Home/Banner";
import VerseOfDay from "../components/Home/VerseOfDay";
import Newsletter from "../components/Home/Newsletter";
import Chapters from "../components/Home/Chapters";
import NotificationBanner from "../components/Shared/NotificationBanner";

interface Props extends ChaptersProps {
  notification: { name: string; message: string; status: string };
}

function HomePage({ chapters, notification }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const pathName = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const access_token = pathName?.match(/\#(?:access_token)\=([\S\s]*?)\&/);

    if (access_token && access_token.length > 1) {
      setCookie("access_token", access_token[1]);
    }
  }, [pathName, setCookie]);
  function handleSubscribe(
    e: FormEvent<HTMLFormElement>,
    formData: NewsletterFormData
  ): boolean {
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
        {notification && (
          <NotificationBanner
            message={notification.message}
            status={notification.status}
          />
        )}
      </main>
    </div>
  );
}

const mapStateToPros = (state) => {
  return {
    notification: state.main?.notification,
  };
};

export default connect(mapStateToPros)(HomePage);
