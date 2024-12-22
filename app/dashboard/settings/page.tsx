import ChangePassword from "@/components/settings/ChangePassword";
import LogOutBtn from "@/components/settings/LogOutBtn";
import ProfileCard from "@/components/settings/ProfileCard";
import SettingsCard from "@/components/settings/SettingsCard";
import TwoFactor from "@/components/settings/TwoFactor";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await auth();

  if (!session?.user) return redirect("/");

  return (
    <SettingsCard title="Settings" description="Manage your account settings">
      <main className="grid md:grid-cols-2 gap-4 pt-5">
        <ProfileCard session={session} />
        {!session.user.isOauth && (
          <TwoFactor
            isTwoFactorEnabled={session.user.isTwoFactorEnabled}
            userId={session.user.id}
            email={session.user.email}
          />
        )}
        <ChangePassword email={session.user.email} />
        <LogOutBtn />
      </main>
    </SettingsCard>
  );
};

export default SettingsPage;
