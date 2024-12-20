import ChangePassword from "@/components/settings/ChangePassword";
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
        <div className="space-y-4">
          <ChangePassword />
          <TwoFactor />
        </div>
      </main>
    </SettingsCard>
  );
};

export default SettingsPage;
