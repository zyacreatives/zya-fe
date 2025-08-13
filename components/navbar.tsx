"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export const Navbar = () => {
  const pathname = usePathname();
  const determineButtonToShow = () => {
    if (pathname.includes("auth")) {
      return (
        <Button
          variant="outline"
          className="group px-4  py-3 flex items-center rounded-3xl font-normal text-slate-700 transition"
        >
          Contact Support
          <ChevronRight
            className=" transition-transform group-hover:translate-x-1 -ml-1"
            size={20}
          />
        </Button>
      );
    }
    return (
      <Button
        variant="outline"
        className="group px-4  py-3 flex items-center rounded-3xl font-normal transition"
      >
        <span className="opacity-80">Have an account?</span>Sign in
        <ChevronRight
          className=" transition-transform group-hover:translate-x-1 -ml-1"
          size={20}
        />
      </Button>
    );
  };
  if (pathname === ROUTES.HOME) {
    return (
      <div className="w-10/12 flex sticky top-0 bg-transparent justify-between items-center mx-auto h-16">
        <Link href={ROUTES.HOME}>
          <img src="/logo.svg" className="w-[80px] h-[45px] " />
        </Link>
        <Link
          href={ROUTES.LOGIN}
          className="bg-radial from-[#9147F8] to-primary text-sm px-6 py-2 rounded-full text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* <div className="md:flex w-10/12 mx-auto justify-between hidden items-center h-16 ">
        <Link href={ROUTES.HOME}>
          <img src="/logo.svg" className="w-[80px] h-[45px] " />
        </Link>
        <Button
          variant="outline"
          className="group px-4 text-sm py-3 flex items-center rounded-3xl font-normal transition"
        >
          Contact Support
          <ChevronRight
            className=" transition-transform group-hover:translate-x-1 -ml-1"
            size={20}
          />
        </Button>
      </div> */}
      {/* <header className="w-full border-b sticky md:block ">
        <nav className="md:flex w-10/12   top-0 bg-transparent mx-auto justify-between items-center h-16">
          <Link href={ROUTES.HOME}>
            <img src="/logo.svg" className="w-[80px] h-[45px] " />
          </Link>
          {determineButtonToShow()}
        </nav>
      </header>
      <MobileNav /> */}
    </>
  );
};

const MobileNav = () => {
  return (
    <header className="w-full border-b md:hidden fixed">
      <nav className="flex w-11/12 top-0 bg-transparent mx-auto justify-between items-center h-12">
        <Link href={ROUTES.HOME}>
          <img src="/logo.svg" className="w-[60px] h-[35px] " />
        </Link>
        <Button
          variant="ghost"
          className="w-fit h-fit rounded-full font-normal transition"
        >
          <img className="w-[35px] h-[35px]" src="/mobile-burger.svg" alt="" />
        </Button>
      </nav>
    </header>
  );
};
