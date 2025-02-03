import Link from "next/link";
import { Heart } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="w-full py-6">
      <div className="container mx-auto px-4">
        <p className="text-center">
          Entwickelt mit{" "}
          <Heart className="inline-block w-5 h-5 mx-1 text-red-400 animate-pulse" />{" "}
          von{" "}
          <Link
            href="https://www.linkedin.com/in/martinseeler"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline transition-all duration-300 ease-in-out hover:text-primary"
          >
            Martin Seeler
          </Link>{" "}
          und Leon Thein
        </p>
      </div>
    </footer>
  );
}
