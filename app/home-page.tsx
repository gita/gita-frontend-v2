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
import Image from "next/image";
import { useTheme } from "next-themes";
import { subscribeUser } from "../lib/subscribeUser";

export type SubscribeMessage = { isSuccess: boolean; message: string };

interface Props extends ChaptersProps {
  notification: { name: string; message: string; status: string };
}

function HomePage({ chapters, notification }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { theme } = useTheme();

  const pathName = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const access_token = pathName?.match(/\#(?:access_token)\=([\S\s]*?)\&/);

    if (access_token && access_token.length > 1) {
      setCookie("access_token", access_token[1]);
    }
  }, [pathName, setCookie]);

  async function handleSubscribe(
    e: FormEvent<HTMLFormElement>,
    { name, email }: NewsletterFormData
  ): Promise<SubscribeMessage> {
    e.preventDefault();
    if (name && email) {
      try {
        await subscribeUser(name, email);

        setModalVisible(true);
        return {
          isSuccess: true,
          message: "",
        };
      } catch (error) {
        return {
          isSuccess: false,
          message: "ERROR: Email already exists",
        };
      }
    } else
      return {
        isSuccess: false,
        message: "ERROR: Name or Email Cannot be Empty",
      };
  }

  return (
    <div className="font-inter min-h-screen dark:bg-dark-bg">
      <main>
        <HomeLayout>
          <Modal
            modalVisible={!modalVisible}
            setModalVisible={setModalVisible}
          />
          <div className="relative">
            <Banner />
            {theme === "light" && (
              <>
                <div className="absolute top-[204px] z-0 w-full h-[460px]">
                  <Image
                    src="/main-background.png"
                    alt="background image"
                    fill
                  />
                </div>
                <Image
                  src="/flower.svg"
                  alt="flower"
                  width={365}
                  height={150}
                  className="absolute top-[54%] left-[50%] -translate-x-2/4"
                />
              </>
            )}
            <VerseOfDay />
          </div>

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
