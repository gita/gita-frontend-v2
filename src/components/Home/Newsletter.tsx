"use client";

import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, Sparkles, User } from "lucide-react";
import { usePathname } from "next/navigation";

import NotificationBanner from "components/NotificationBanner";
import { subscribeUser } from "lib/subscribeUser";
import { RootState } from "redux/types";
import { getTranslate } from "shared/translate";

import Modal from "./Modal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const pathName = usePathname();
  const [, setCookie] = useCookies(["access_token"]);

  const translate = getTranslate(translations, locale);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const access_token = pathName?.match(/\#(?:access_token)\=([\S\s]*?)\&/);

    if (access_token && access_token.length > 1) {
      setCookie("access_token", access_token[1]);
    }
  }, [pathName, setCookie]);

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);
    const { isSuccess: success, message } = await handleSubscribe(
      evt,
      formData,
    );
    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);
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
      } catch {
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
    <section className="relative z-0 overflow-hidden py-16 md:py-24">
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-card"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Side - Content & Form */}
            <div className="relative z-10 flex flex-col justify-center p-8 md:p-12">
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                {translate("Shloka of the Day")}
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-8 text-base text-muted-foreground md:text-lg"
              >
                {translate(
                  "Have the eternal wisdom of the Gita delivered to your inbox each morning",
                )}
              </motion.p>

              {/* Form or Success State */}
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-3 rounded-xl bg-green-50 p-6 text-center dark:bg-green-950/30"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <CheckCircle2 className="size-12 text-green-500" />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-green-700 dark:text-green-400">
                      {translate("You're all set!")}
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      {translate("Expect divine wisdom in your inbox soon.")}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-4"
                    onSubmit={onSubmit}
                    aria-label="Newsletter subscription form"
                  >
                    {/* Name Input */}
                    <div className="relative">
                      <User
                        className={`pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 transition-colors ${focusedField === "name" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <Input
                        className="w-full bg-muted/50 pl-10 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20 dark:bg-background dark:focus:bg-background"
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            name: e.target.value,
                          }))
                        }
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={translate("Your Name")}
                        aria-label="Your name"
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <Mail
                        className={`pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <Input
                        className="w-full bg-muted/50 pl-10 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20 dark:bg-background dark:focus:bg-background"
                        id="email"
                        name="email"
                        type="email"
                        placeholder={translate("Your Email")}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            email: e.target.value,
                          }))
                        }
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        aria-label="Your email address"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary px-8 py-6 text-base font-medium shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
                        aria-label="Subscribe to daily Bhagavad Gita newsletter"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="size-5 rounded-full border-2 border-white border-t-transparent"
                          />
                        ) : (
                          <>
                            <Sparkles className="mr-2 size-5" />
                            {translate("Subscribe")}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {!isValid && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 text-sm text-red-500 dark:text-red-400"
                  >
                    <p>{errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social Proof */}
              {!isSuccess && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-6 text-sm text-muted-foreground"
                >
                  ✨{" "}
                  {translate(
                    "Join thousands of seekers on this spiritual journey",
                  )}
                </motion.p>
              )}
            </div>

            {/* Right Side - Image */}
            <div className="relative hidden md:block">
              {/* Gradient overlay for better text contrast if needed */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/60 via-white/40 to-transparent dark:from-card/60 dark:via-card/40" />

              {/* Image */}
              <div className="relative h-full min-h-[400px] overflow-hidden">
                <picture>
                  <source
                    media="(min-width:1024px)"
                    srcSet="/images/hero/bhagavad-gita-4x3-1024x768.webp 1024w, /images/hero/bhagavad-gita-4x3-2048x1536.webp 2048w"
                    sizes="50vw"
                    type="image/webp"
                  />
                  <img
                    src="/images/hero/bhagavad-gita-4x3-1024x768.webp"
                    alt="Lord Krishna and Arjuna - Bhagavad Gita"
                    className="size-full object-cover object-center"
                    loading="lazy"
                  />
                </picture>
              </div>

              {/* Decorative quote overlay */}
              <div className="absolute inset-0 z-20 flex items-end justify-center p-8">
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="rounded-xl bg-white/90 p-4 text-center shadow-lg backdrop-blur-sm dark:bg-card/90"
                >
                  <p className="text-sm italic text-foreground/80">
                    &ldquo;
                    {translate(
                      "The mind is restless and difficult to restrain, but it is subdued by practice.",
                    )}
                    &rdquo;
                  </p>
                  <footer className="mt-2 text-xs font-medium text-primary">
                    — Bhagavad Gita 6.35
                  </footer>
                </motion.blockquote>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {notification && (
        <NotificationBanner
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  );
};

const mapStateToPros = (state: RootState) => ({
  notification: state.main?.notification,
});

export default connect(mapStateToPros)(Newsletter);
