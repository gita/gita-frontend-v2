"use client";

import { connect } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import Image from "next/image";
import Modal from "./Modal";
import { subscribeUser } from "lib/subscribeUser";
import NotificationBanner from "components/Shared/NotificationBanner";

type SubscribeMessage = { isSuccess: boolean; message: string };

interface Props {
  notification: { name: string; message: string; status: string };
}

const Newsletter = ({ notification }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<NewsletterFormData>({
    name: "",
    email: "",
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");

  const pathName = usePathname();
  const [cookies, setCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const access_token = pathName?.match(/\#(?:access_token)\=([\S\s]*?)\&/);

    if (access_token && access_token.length > 1) {
      setCookie("access_token", access_token[1]);
    }
  }, [pathName, setCookie]);

  const onSubmit = async (e) => {
    const { isSuccess, message } = await handleSubscribe(e, formData);
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
    <div className="mt-14 relative z-0">
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Image
        src="/newsbg.png"
        alt="BG Newsletter Image"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="newsletter"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mt-10 p-14 text-center">
          <h1 className="text-4xl text-black font-bold mb-8 z-50">
            Have the Shloka of the Day delivered to your inbox each morning.
          </h1>
          <form className="flex flex-col md:flex-row" onSubmit={onSubmit}>
            <input
              className="appearance-none z-50 mt-4 md:mt-0 border rounded-md w-full py-3 mr-6 px-3 text-gray-700 leading-tight focus:outline-none focus:border-my-orange dark:bg-white"
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prevData) => {
                  return {
                    ...prevData,
                    name: e.target.value,
                  };
                })
              }
              placeholder="Enter Your Name"
            />
            <input
              className="appearance-none z-50 mt-4 md:mt-0 border rounded-md w-full py-3 mr-6  px-3 text-gray-700 leading-tight focus:outline-none  focus:border-my-orange dark:bg-white"
              id="email"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevData) => {
                  return {
                    ...prevData,
                    email: e.target.value,
                  };
                })
              }
            />
            <button
              type="submit"
              className="bg-my-orange z-50 mt-4 md:mt-0 shadow text-white px-8 py-3 rounded-md hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            >
              Subscribe
            </button>
          </form>
          {!isValid && (
            <div className="text-lg text-red-400 mt-4">
              <p className="font-bold mr-20 mt-12">{errorMessage}</p>
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

const mapStateToPros = (state) => {
  return {
    notification: state.main?.notification,
  };
};

export default connect(mapStateToPros)(Newsletter);
