import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogIn, LogOut } from "lucide-react";

export async function PageHeader() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-background border-b">
      <Link href="/" className="text-2xl font-bold text-primary">
        AreYouSmartEnough
      </Link>
      {isUserAuthenticated ? (
        <div className="flex items-center gap-4">
          <Button asChild>
            <LogoutLink>
              Abmelden
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      ) : (
        <Button asChild>
          <LoginLink>
            Anmelden
            <LogIn />
          </LoginLink>
        </Button>
      )}
    </header>
  );
}
