import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import AuthFormFooter from "./AuthFormFooter";
import ProviderLogin from "./ProviderLogin";

interface AuthFormProps {
  children: ReactNode;
  formTitle: string;
  showProvider: boolean;
  footerLabel: string;
  footerHref: string;
}

const AuthForm = ({
  children,
  footerHref,
  footerLabel,
  formTitle,
  showProvider,
}: AuthFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-3 items-end">
        {showProvider && <ProviderLogin />}
        <AuthFormFooter footerLabel={footerLabel} footerHref={footerHref} />
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
