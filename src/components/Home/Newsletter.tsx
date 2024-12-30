"use client";

import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import Image from "next/image";
import { usePathname } from "next/navigation";

import NotificationBanner from "components/NotificationBanner";
import { subscribeUser } from "lib/subscribeUser";
import { RootState } from "redux/types";
import { getTranslate } from "shared/translate";

import Modal from "./Modal";

type SubscribeMessage = { isSuccess: boolean; message: string };

type Props = {
  notification?: {
    name?: string;
    message: string;
    status: string;
  };
} & LocaleAndTranslations;

const Newsletter = ({ notification, locale, translations }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<NewsletterFormData>({
    name: "",
    email: "",
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");

  const pathName = usePathname();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const translate = getTranslate(translations, locale);

  useEffect(() => {
    console.log("[Newsletter] Component mounted");
    setIsClient(true);
  }, []);

  useEffect(() => {
    const access_token = pathName?.match(/\#(?:access_token)\=([\S\s]*?)\&/);

    if (access_token && access_token.length > 1) {
      setCookie("access_token", access_token[1]);
    }
  }, [pathName, setCookie]);

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const { isSuccess, message } = await handleSubscribe(evt, formData);
    if (isSuccess) {
      setFormData({ name: "", email: "" });
      setIsValid(true);
      setErrorMessage("");
    } else {
      setIsValid(false);
      setErrorMessage(message);
    }
  };

  async function handleSubscribe(
    e: FormEvent<HTMLFormElement>,
    { name, email }: NewsletterFormData,
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

  // Only render content after hydration
  if (!isClient) {
    return null;
  }

  return (
    <div className="relative z-0 mt-14">
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Image
        src="/newsbg.png"
        alt="BG Newsletter Image"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="newsletter bg-light-orange dark:bg-dark-100"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mt-10 p-14 text-center">
          <h3 className="z-50 mb-8 text-4xl font-bold text-black dark:text-white">
            {translate(
              "Have the Shloka of the Day delivered to your inbox each morning",
            )}
          </h3>
          <form className="flex flex-col md:flex-row" onSubmit={onSubmit}>
            <input
              className="z-50 mr-6 mt-4 w-full appearance-none rounded-md border p-3 leading-tight text-gray-700 focus:border-my-orange focus:outline-none dark:bg-dark-100 dark:text-white dark:placeholder:text-gray-50 md:mt-0"
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
              placeholder={translate("Enter Your Name")}
            />
            <input
              className="z-50 mr-6 mt-4 w-full appearance-none rounded-md border p-3 leading-tight text-gray-700 focus:border-my-orange focus:outline-none dark:bg-dark-100 dark:text-white dark:placeholder:text-gray-50 md:mt-0"
              id="email"
              type="email"
              placeholder={translate("Enter Your Email")}
              value={formData.email}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
            />
            <button
              type="submit"
              className="z-50 mt-4 rounded-md bg-my-orange px-8 py-3 text-white shadow hover:bg-my-orange/75 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 md:mt-0"
            >
              {translate("Subscribe")}
            </button>
          </form>
          {!isValid && (
            <div className="mt-4 text-lg text-red-400 dark:text-red-800">
              <p className="mr-20 mt-12 font-bold">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
      {notification && (
        <NotificationBanner
          message={notification.message}
          status={notification.status}
        />
      )}
    </div>
  );
};

const mapStateToPros = (state: RootState) => ({
  notification: state.main?.notification,
});

export default connect(mapStateToPros)(Newsletter);
