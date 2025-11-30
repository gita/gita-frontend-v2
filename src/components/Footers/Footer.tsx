"use client";

import { BookOpen, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import LinkWithLocale from "components/LinkWithLocale";

const SocialIcon = ({ name }: { name: string }) => {
  if (name === "Facebook") {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" className="size-5">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
    );
  }
  if (name === "Twitter") {
    return (
      <svg fill="currentColor" viewBox="0 0 30 30" className="size-5">
          <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
        </svg>
    );
  }
  return <Github className="size-5" />;
};

type Props = {
  translate: Translate;
};

const Footer = (props: Props) => {
  const { translate } = props;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/80 py-12 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo + Tagline + Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="size-6 text-primary" />
              <span className="text-xl font-bold">
                {translate("Bhagavad Gita")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {translate("Ancient wisdom for modern life")}
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/iiRadhaKrishnaii/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <SocialIcon name="Facebook" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com/ShriKrishna?s=20&t=92c4he0cK-nq_Bo6WOx0ZQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <SocialIcon name="Twitter" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://github.com/gita"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="size-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">
              {translate("Quick Links")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LinkWithLocale
                  href="/app"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Mobile App")}
                </LinkWithLocale>
              </li>
              <li>
                <LinkWithLocale
                  href="/gitagpt"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Gita AI")}
                </LinkWithLocale>
              </li>
              <li>
                <LinkWithLocale
                  href="/bhagavad-gita-quotes"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Quotes")}
                </LinkWithLocale>
              </li>
              <li>
                <LinkWithLocale
                  href="/donate"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Donate")}
                </LinkWithLocale>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">
              {translate("Resources")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LinkWithLocale
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("About Gita")}
                </LinkWithLocale>
              </li>
              <li>
                <LinkWithLocale
                  href="/acknowledgements"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Acknowledgements")}
                </LinkWithLocale>
              </li>
              <li>
                <a
                  href="https://radhakrishna.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Blog")}
                </a>
              </li>
              <li>
                <a
                  href="https://rapidapi.com/bhagavad-gita-bhagavad-gita-default/api/bhagavad-gita3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">
              {translate("Legal & Contact")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LinkWithLocale
                  href="/privacy-policy"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Privacy")}
                </LinkWithLocale>
              </li>
              <li>
                <LinkWithLocale
                  href="/terms-of-service"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Terms")}
                </LinkWithLocale>
              </li>
              <li>
                <a
                  href="mailto:admin@bhagavadgita.io"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {translate("Contact Us")}
                </a>
              </li>
            </ul>
                    </div>
              </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            <p>
              {`© ${year} ${translate("Copyright")}: `}
              <a
                href="https://vedvyas.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Ved Vyas Foundation.
              </a>
              <br className="sm:hidden" />
              <span className="sm:inline">
                {" "}
                {translate("All rights reserved")}.
              </span>
            </p>
          </div>

          {/* Download Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/play_store.svg"
                alt="Get it on Google Play"
                height={40}
                width={135}
                className="h-10 w-auto"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/bhagavad-gita-hindi-english/id1602895635"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/app_store.svg"
                alt="Download on the App Store"
                height={40}
                width={135}
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
