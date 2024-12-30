import { Metadata } from "next";

import PrivacyTermsBanner from "components/PrivacyTermsBanner";

export const metadata: Metadata = {
  title: "Terms of Service - BhagavadGita.io",
  description: "Read our terms of service to understand the rules, guidelines, and conditions for using BhagavadGita.io. Learn about user responsibilities, copyright policies, and acceptable use.",
  openGraph: {
    title: "Terms of Service - BhagavadGita.io",
    description: "Read our terms of service to understand the rules, guidelines, and conditions for using BhagavadGita.io. Learn about user responsibilities, copyright policies, and acceptable use.",
    url: "https://bhagavadgita.io/terms-of-service",
    siteName: "Bhagavad Gita",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
        secureUrl: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
        height: 1080,
        width: 1920,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - BhagavadGita.io",
    description: "Read our terms of service to understand the rules, guidelines, and conditions for using BhagavadGita.io. Learn about user responsibilities, copyright policies, and acceptable use.",
    images: ["https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75"],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/terms-of-service",
  },
};

export default function TermsOfService() {
  return (
    <>
      <PrivacyTermsBanner
        title={metadata.title as string}
        lastUpdated="2023-07-17"
      />
      <div className="mx-auto max-w-5xl px-4 py-12  font-inter sm:px-6">
        <p className="mb-4">
          Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of
          Service&quot;) carefully before using the BhagavadGita.io website (the
          &quot;Service&quot;) operated by Ved Vyas Foundation (&quot;us&quot;,
          &quot;we&quot;, or &quot;our&quot;).
        </p>
        <p className="mb-4">
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users, and others who access or use the Service.
        </p>
        <p className="mb-4">
          By accessing or using the Service, you agree to be bound by these
          Terms. If you disagree with any part of the terms, then you may not
          access the Service.
        </p>
        <h2 className="mb-4 text-xl font-bold">Account Terms</h2>
        <ul className="mb-4 ml-8 list-disc">
          <li>
            <p>
              <strong>Required Information</strong>
            </p>
            <p>
              You must provide a valid email address in order to complete the
              signup process. Any other information requested, such as your real
              name, is optional, unless you are accepting these terms on behalf
              of a legal entity.
            </p>
          </li>
          <li>
            <p>
              <strong>Account Requirements</strong>
            </p>
            <p>
              We have a few simple rules for accounts on BhagavadGita.io&apos;s
              Service.
            </p>
            <ul className="mb-4 ml-8 list-disc">
              <li>
                You must be a human to create an account. Accounts registered by
                &quot;bots&quot; or other automated methods are not permitted.
              </li>
              <li>
                One person or legal entity may maintain no more than one
                account.
              </li>
              <li>
                Your login may only be used by one person — i.e., a single login
                may not be shared by multiple people.
              </li>
            </ul>
          </li>
          <li>
            <p>
              <strong>User Account Security</strong>
            </p>
            <p>
              You are responsible for keeping your account secure while you use
              our Service.
            </p>
          </li>
        </ul>
        <h2 className="mb-4 text-xl font-bold">Copyright Statement</h2>
        <p className="mb-4">
          From this site, you may download the information and use it on your
          computer for personal study or other non-commercial purposes. You must
          include appropriate attribution/credit on the material you extract. In
          this case, free means free. It cannot be bundled with anything sold,
          nor can you charge for shipping, handling, or anything. It is provided
          for personal study or for use in undergraduate or seminary religion
          classes or other non-commercial study.
        </p>
        <p className="mb-4">
          All the translations on this site have been taken with permission from
          their respective authors.
        </p>
        <h2 className="mb-4 text-xl font-bold">Acceptable Use</h2>
        <ul className="mb-4 ml-8 list-disc">
          <li>
            <p>
              <strong>Compliance with Laws and Regulations</strong>
            </p>
            <p>
              Your use of the Website and Service must not violate any
              applicable laws, including copyright or trademark laws, export
              control laws, or other laws in your jurisdiction. You are
              responsible for making sure that your use of the Service is in
              compliance with laws and any applicable regulations.
            </p>
          </li>
          <li>
            <p>
              <strong>Conduct Restrictions</strong>
            </p>
            <p>
              While using BhagavadGita.io, you agree that you will not under any
              circumstances:
            </p>
            <ul className="mb-4 ml-8 list-disc">
              <li>
                use our servers for any form of excessive automated bulk
                activity (for example, spamming), or relay any other form of
                unsolicited advertising or solicitation through our servers,
                such as get-rich-quick schemes;
              </li>
              <li>
                attempt to disrupt or tamper with BhagavadGita.io&apos;s servers
                in ways that could harm our Website or Service, to place undue
                burden on BhagavadGita.io&apos;s servers through automated
                means, or to access BhagavadGita.io&apos;s Service in ways that
                exceed your authorization.
              </li>
            </ul>
          </li>
          <li>
            <p>
              <strong>Scraping</strong>
            </p>
            <p>
              Scraping refers to extracting data from our Website via an
              automated process, such as a bot or webcrawler. It does not refer
              to the collection of information through Bhagavad Gita API. You
              may scrape the website for the following reasons:
            </p>
            <ul className="mb-4 ml-8 list-disc">
              <li>
                Researchers may scrape public, non-personal information from
                BhagavadGita.io for research purposes, only if any publications
                resulting from that research are open access.
              </li>
              <li>
                Archivists may scrape BhagavadGita.io for public data for
                archival purposes.
              </li>
              <li>You may not scrape BhagavadGita.io for spamming purposes.</li>
            </ul>
          </li>
          <li>
            <p>
              <strong>Excessive Bandwidth Use</strong>
            </p>
            <p>
              If we determine your bandwidth usage to be significantly excessive
              in relation to other Bhagavad Gita customers, we reserve the right
              to suspend your account until you can reduce your bandwidth
              consumption.
            </p>
          </li>
        </ul>
        <h2 className="mb-4 text-xl font-bold">API Terms</h2>
        <ul className="mb-4 ml-8 list-disc">
          <li>
            <p>
              <strong>No Abuse or Overuse of the API</strong>
            </p>
            <p>
              Abuse or excessively frequent requests to BhagavadGita.io via the
              API may result in the temporary or permanent suspension of your
              account&apos;s access to the API. BhagavadGita.io, in our sole
              discretion, will determine abuse or excessive usage of the API. We
              will make a reasonable attempt to warn you via email prior to
              suspension.
            </p>
            <p>
              You may not share API tokens to exceed BhagavadGita.io&apos;s rate
              limitations.
            </p>
            <p>
              You may not use the API to download data or Content from
              BhagavadGita.io for spamming purposes.
            </p>
            <p>
              BhagavadGita.io may offer subscription-based access to our API for
              those Users who require high-throughput access or access that
              would result in resale of BhagavadGita.io Service.
            </p>
            <p>
              Using the Bhagavad Gita API, you may download the information and
              use it in your app or website as long as you do not charge for it.
              You must include appropriate attribution/credit on the material
              you extract. In this case, free means free. It cannot be bundled
              with anything sold, nor can you charge for shipping, handling, or
              anything. It is provided for non-commercial use only.
            </p>
          </li>
        </ul>
        <h2 className="mb-4 text-xl font-bold">Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms.
        </p>
        <p className="mb-4">
          Upon termination, your right to use the Service will immediately
          cease. If you wish to terminate your account, you may simply
          discontinue using the Service.
        </p>
        <h2 className="mb-4 text-xl font-bold">Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the
          laws of Haryana, India, without regard to its conflict of law
          provisions.
        </p>
        <p className="mb-4">
          Our failure to enforce any right or provision of these Terms will not
          be considered a waiver of those rights. If any provision of these
          Terms is held to be invalid or unenforceable by a court, the remaining
          provisions of these Terms will remain in effect. These Terms
          constitute the entire agreement between us regarding our Service and
          supersede and replace any prior agreements we might have had between
          us regarding the Service.
        </p>
        <h2 className="mb-4 text-xl font-bold">Changes</h2>
        <p className="mb-4">
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will try to
          provide at least 30 days&apos; notice prior to any new terms taking
          effect. What constitutes a material change will be determined at our
          sole discretion.
        </p>
        <p className="mb-4">
          By continuing to access or use our Service after those revisions
          become effective, you agree to be bound by the revised terms. If you
          do not agree to the new terms, please stop using the Service.
        </p>
        <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <ul className="mb-4 ml-8 list-disc">
          <li>By email: contact@bhagavadgita.io</li>
        </ul>
      </div>
    </>
  );
}
