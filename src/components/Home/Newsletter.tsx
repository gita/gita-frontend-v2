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
        className="newsletter"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mt-10 p-14 text-center">
          <h1 className="z-50 mb-8 text-4xl font-bold text-black">
            Have the Shloka of the Day delivered to your inbox each morning.
          </h1>
          <form className="flex flex-col md:flex-row" onSubmit={onSubmit}>
            <input
              className="z-50 mr-6 mt-4 w-full appearance-none rounded-md border p-3 leading-tight text-gray-700 focus:border-my-orange focus:outline-none dark:bg-white md:mt-0"
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
              className="z-50 mr-6 mt-4 w-full appearance-none rounded-md border p-3 leading-tight  text-gray-700 focus:border-my-orange focus:outline-none dark:bg-white  md:mt-0"
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
              className="z-50 mt-4 rounded-md bg-my-orange px-8 py-3 text-white shadow hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 md:mt-0"
            >
              Subscribe
            </button>
          </form>
          {!isValid && (
            <div className="mt-4 text-lg text-red-400">
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

const mapStateToPros = (state) => {
  return {
    notification: state.main?.notification,
  };
};

export default connect(mapStateToPros)(Newsletter);
