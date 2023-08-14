import { FormEvent, useState } from "react";
import Image from "next/image";
import { SubscribeMessage } from "../../app/home-page";

interface Props {
  handleSubscribe: (
    e: FormEvent<HTMLFormElement>,
    formData: NewsletterFormData
  ) => Promise<SubscribeMessage>;
}

const Newsletter = ({ handleSubscribe }: Props) => {
  const [formData, setFormData] = useState<NewsletterFormData>({
    name: "",
    email: "",
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div className="mt-14 relative z-0">
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
    </div>
  );
};

export default Newsletter;
