import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PageHeader() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-background border-b">
      <Link href="/" className="text-2xl font-bold text-primary">
        AreYouSmartEnough
      </Link>
      <Button asChild>
        <Link href="/signin">Anmelden</Link>
      </Button>
    </header>
  );
}
