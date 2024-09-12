import Link from "next/link";
import { CardsProps } from "./interface";

export default function Cards({
  message,
  description,
  instructions,
  credentials,
  options,
  checkin,
  signInButton,
}: CardsProps) {
  return (
    <div>
      <img src="/logo.png" alt="logo" className="h-12 m-4" />
      <div className="flex justify-center items-center min-h-screen inset-0">
        <div className="w-520 h-524 top-250 left-460 rounded-lg border border-gray-300 absolute shadow-xl p-16 bg-white">
          <div className="w-[20.08vw] h-[45.72vh] top-[33.80vh] left-[28.96vw] gap-[2.50vw]">
            <h1 className="font-roboto font-medium text-2xl leading-tight text-center mb-2">
              {message}
            </h1>
            <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondaryHeading mb-6">
              {description}
            </p>
            <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondaryHeading mb-6">
              {instructions}
            </p>

            <div className="flex justify-center items-center mb-6">
              {signInButton}
            </div>

            <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondaryHeading mb-6">
              <span className="mr-2">{options}</span>
              <Link
                className="font-open-sans font-bold text-20 leading-27.24 text-accent text-center underline"
                href={checkin === "Login" ? "/login" : "/sign-up"}
              >
                {checkin}
              </Link>
            </p>

            <div className="text-secondaryHeading font-roboto font-medium text-[12px] leading-[14.06px] text-center underline">
              <Link href="">Terms and Conditions</Link>
              <div className="w-[2px] h-[12px] bg-current inline-block bg-accent mx-3"></div>
              <Link href="">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
