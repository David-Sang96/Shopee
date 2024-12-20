import { Icons } from "../icons";
import { Button } from "../ui/button";
import SettingsCard from "./SettingsCard";

const ChangePassword = () => {
  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Change Password</p>
        <Button
          size={"sm"}
          aria-label="Edit"
          className="bg-white text-black hover:bg-white"
        >
          <Icons.key aria-hidden="true" style={{ width: 18, height: 18 }} />
        </Button>
      </div>
    </SettingsCard>
  );
};

export default ChangePassword;
