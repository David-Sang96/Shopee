import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailTemplateProps {
  username?: string;
  updatedDate?: Date;
  resetPasswordLink?: string;
}

export const ResetPasswordEmailTemplate = ({
  username,
  updatedDate,
  resetPasswordLink,
}: ResetPasswordEmailTemplateProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate);

  return (
    <Html>
      <Head />
      <Preview>
        You requested to updated the password for your Shopee account
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <h2 style={logoTitle}>Shopee</h2>
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hello {username},</Text>
            <Text style={paragraph}>
              We’re confirming that the password for your Shopee account was
              successfully changed on {formattedDate}. If you made this change,
              no further action is required.
            </Text>
            <Text style={paragraph}>
              If you did NOT request this password change, please{" "}
              <Link href={resetPasswordLink} style={link}>
                reset your password
              </Link>{" "}
              immediately to secure your account.
            </Text>
            <Text style={paragraph}>
              For further assistance, feel free to contact{" "}
              <Link href="#" style={link}>
                Shopee Support
              </Link>
              .
            </Text>
            <Text style={paragraph}>
              Best regards,
              <br />
              The Shopee Support Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmailTemplate.PreviewProps = {
  username: "Shopee user",
  updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
} as ResetPasswordEmailTemplateProps;

export default ResetPasswordEmailTemplate;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 30,
};

const logoTitle = {
  fontSize: 22,
  fontWeight: 600,
  display: "inline",
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgb(145,71,255)",
  width: "102px",
};

const link = {
  textDecoration: "underline",
};
