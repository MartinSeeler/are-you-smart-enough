"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { Provider as JotaiProvider } from "jotai";
import PlausibleProvider from "next-plausible";

import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <PlausibleProvider
      domain="are-you-smart-enough.vercel.app"
      trackOutboundLinks={true}
    >
      <JotaiProvider>
        <KindeProvider>{children}</KindeProvider>
      </JotaiProvider>
    </PlausibleProvider>
  );
};
