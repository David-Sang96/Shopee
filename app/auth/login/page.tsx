import AuthForm from "@/components/auth/AuthForm";

const LoginPage = () => {
  return (
    <AuthForm
      formTitle="Login to your account"
      footerHref="/auth/register"
      footerLabel="Don't have an account?"
      showProvider
    >
      <h2>Login Form</h2>
    </AuthForm>
  );
};

export default LoginPage;
