import getSite from "@/actions/getSite";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default async function AuthenticationPage({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  if (!site) {
    return <></>;
  }
  return (
    <div className="container h-screen flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden lg:flex h-full flex-col bg-muted p-10 text-white">
        <div className="z-10 absolute inset-0 bg-zinc-900/50" />
        <Image
          src={site.seoBanner ?? ""}
          width={1400}
          height={600}
          alt={site.name}
          className="z-0 absolute top-0 left-0 h-screen object-cover"
        />
        <div className="z-20 flex items-center gap-2">
          <Image
            src={site.logoDark ?? ""}
            alt={site.name}
            width={512}
            height={512}
            className="w-20 bg-blend-color-doge"
          />
          <div className="text-white">
            <h1 className="text-lg font-extrabold">{site.name}</h1>
            <h4 className="font-bold">{site.address}</h4>
          </div>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {/* <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and helped me deliver
              stunning designs to my clients faster than ever before.&rdquo;
            </p> */}
            <footer className="text-sm">Created By Education Firm</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  );
}
