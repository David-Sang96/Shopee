import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type TwoFactorEmailTemplateProps = {
  code: string;
};

const TwoFactorEmailTemplate = ({ code }: TwoFactorEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Shopee Two-Factor Authentication Code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={codeTitle}>
            Your Two-Factor Authentication Code
          </Heading>
          <Text style={codeDescription}>
            Enter this code in your open browser window. It will expire in 15
            minutes.
          </Text>
          <Section style={codeContainer}>
            <Heading style={codeStyle}>{code}</Heading>
          </Section>
          <Text style={paragraph}>Didn't expect this email?</Text>
          <Text style={paragraph}>
            If you did not request this code, please ignore this email. For any
            concerns, contact support.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TwoFactorEmailTemplate;

const main = {
  backgroundColor: "#f4f6f9", // Lighter background for contrast
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textAlign: "center" as const,
  padding: "20px 0", // Add padding to top and bottom for breathing space
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "10px", // Rounded corners for modern look
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // Subtle shadow for depth
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "5% 6%",
  fontSize: "16px", // Adjust base font size for readability
};

const codeTitle = {
  textAlign: "center" as const,
  fontSize: "22px", // Larger size for better prominence
  marginBottom: "10px",
  color: "#333",
};

const codeDescription = {
  textAlign: "center" as const,
  fontSize: "14px", // Smaller font size for description
  color: "#666", // Slightly lighter color for description text
  marginBottom: "20px", // Space between description and code
};

const codeContainer = {
  background: "#f0f0f0", // Subtle background for code block
  borderRadius: "4px",
  margin: "20px auto", // Add more space around the code block
  width: "260px",
  maxWidth: "100%",
  padding: "15px",
};

const codeStyle = {
  color: "#000",
  display: "inline-block",
  fontSize: "28px", // Larger font size for code
  paddingBottom: "10px",
  paddingTop: "10px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
  letterSpacing: "8px", // Space out the digits for better readability
};

const paragraph = {
  color: "#444",
  fontSize: "14px", // Smaller font size for paragraph
  margin: "10px 0", // Add spacing between paragraphs
  textAlign: "center" as const,
};
