import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function PageHeader() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-background border-b">
      <Link href="/" className="text-2xl font-bold text-primary">
        AreYouSmartEnough
      </Link>
      {isUserAuthenticated ? (
        <div className="flex items-center gap-4">
          <span>Hallo, {user?.given_name}</span>
          <Button asChild>
            <LogoutLink>Abmelden</LogoutLink>
          </Button>
        </div>
      ) : (
        <Button asChild>
          <LoginLink>Anmelden</LoginLink>
        </Button>
      )}
    </header>
  );
}
