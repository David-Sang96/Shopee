import { Icons } from "../icons";
import { Button } from "../ui/button";
import SettingsCard from "./SettingsCard";

const TwoFactor = () => {
  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Two Factor Authentication</p>
        {true ? (
          <Button size={"sm"} className=" gap-1">
            <Icons.check aria-hidden="true" style={{ width: 13, height: 13 }} />
            On
          </Button>
        ) : (
          <Button
            size={"sm"}
            className="bg-red-500 text-white hover:bg-red-600 gap-1"
          >
            <Icons.cross aria-hidden="true" style={{ width: 15, height: 15 }} />
            Off
          </Button>
        )}
      </div>
    </SettingsCard>
  );
};

export default TwoFactor;
