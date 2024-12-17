import AuthForm from "@/components/auth/AuthForm";

const RegisterPage = () => {
  return (
    <AuthForm
      formTitle="Register account"
      footerHref="/auth/login"
      footerLabel="Already have an account?"
      showProvider
    >
      <h2>Register Form</h2>
    </AuthForm>
  );
};

export default RegisterPage;
