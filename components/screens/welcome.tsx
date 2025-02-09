"use client";

import React from "react";
import { Button } from "../ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogIn } from "lucide-react";

const Welcome = () => {
  return (
    <>
      <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
        Willkommen beim Vorbereitungstest für die Oberstufe
      </h1>
      <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
        Auf dieser Website kannst du testen, wie gut du auf die 11. Klasse
        vorbereitet bist. Der Test umfasst verschiedene Aufgaben aus
        ausgewählten Fächern der 10. Klasse, wie Chemie, Physik, Deutsch und
        Englisch. Mithilfe einer KI werden deine Antworten analysiert, und du
        erhältst ein individuelles Feedback zu deinen Stärken und Schwächen.
        Ziel ist es, dir dabei zu helfen, gezielt an deinen Fähigkeiten zu
        arbeiten und bestens in die Oberstufe zu starten.
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
