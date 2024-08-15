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
            <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondaryHeading">
              {description}
            </p>
            <br />
            <br />
            <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondaryHeading">
              {instructions}
            </p>
            <br />
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center">
                {signInButton}
              </div>
            </div>

            <br />
            <br />
            <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondaryHeading">
              <span className="mr-2">{options}</span>
              <span>
                <Link
                  className="font-open-sans font-bold text-20 leading-27.24 text-accent text-center underline"
                  href={checkin === "Sign up" ? "/sign-up" : checkin === "Log in" ? "/login" : "#"}
                >
                  {checkin}
                </Link>

              </span>
            </p>
            <br />
            <div className="text-secondaryHeading font-roboto font-medium text-[12px] leading-[14.06px] text-center underline">
              <Link className="" href="">
                Terms and Conditions
              </Link>
              <div className="w-[2px] h-[12px] bg-current inline-block bg-accent mx-3"></div>
              <Link href="">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
