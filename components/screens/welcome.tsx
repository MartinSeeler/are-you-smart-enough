"use client";

import React from "react";
import { Button } from "../ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogIn } from "lucide-react";

const Welcome = () => {
  return (
    <>
      <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
        Willkommen zum KI-Wissenscheck
      </h1>
      <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
        Hier kannst du prüfen, wie gut du die Präsentation über Künstliche Intelligenz verstanden hast.
        Beantworte die Fragen so genau wie möglich. Manche Aufgaben haben mehrere richtige Antworten, bei anderen musst du frei schreiben.
        Viel Erfolg und zeig, dass du schon jetzt fit für die Zukunft mit KI bist.
      </p>
      <div className="mt-10 flex items-center gap-x-6">
        <Button asChild size={"lg"}>
          <LoginLink>
            Anmelden und Test starten
            <LogIn />
          </LoginLink>
        </Button>
      </div>
    </>
  );
};

export default Welcome;
