"use client";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { IUserDetailsProps } from "./interface";

export default function UserDetails(props: IUserDetailsProps) {
  const { onFill } = props;
  const { data: session } = useSession();
  return (
    <div className="p-6 bg-white shadow-card rounded-[16px]">
      <div className="flex items-start gap-4 w-full">
        <img
          src={session?.user?.image || ""}
          alt="User avatar image"
          className="w-[200px] rounded-[12px]"
        />
        <div className="px-4 flex flex-col gap-6">
          <div>
            <h1 className="text-semibold text-2xl leading-2xl text-heading">
              Welcome {session?.user?.name}
            </h1>
            <p className="text-base leading-base text-secondaryHeading">
              You are currently using the free version of Away me
            </p>
          </div>
          <div className="inline">
            <Button
              buttonText="Fill Calendar"
              buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-accent hover:bg-hover text-white hover:text-accent text-base leading-base"
              onClick={() => onFill()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
