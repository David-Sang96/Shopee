import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Icons } from "./icons";

interface VerificationEmailTemplateProps {
  userFirstName?: string;
  verifyEmailLink?: string;
}

export const VerificationEmailTemplate = ({
  userFirstName,
  verifyEmailLink,
}: VerificationEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm your account - Welcome to Shopee</Preview>
      <Body style={main}>
        <Container style={container}>
          <Icons.shoppingBasket className="size-40" />
          <Section>
            <Text style={text}>Hi {userFirstName},</Text>
            <Text style={text}>
              Thanks for signing up for Shopee! To complete your registration,
              please verify your email address by clicking the link below:
            </Text>
            <Button style={button} href={verifyEmailLink}>
              Verify Account
            </Button>
            <Text style={text}>
              If you are not trying to create account, please ignore this email.
            </Text>
            <Text style={text}>Thanks, Shopee Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

VerificationEmailTemplate.PreviewProps = {
  userFirstName: "Shopee",
  verifyEmailLink: "https://google.com",
} as VerificationEmailTemplateProps;

export default VerificationEmailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#2DAC5C",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
