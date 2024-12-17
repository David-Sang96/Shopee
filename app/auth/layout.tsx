import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <section className="max-w-md mx-auto mt-10">{children}</section>;
};

export default AuthLayout;
