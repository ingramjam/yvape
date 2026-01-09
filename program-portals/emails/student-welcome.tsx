import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface StudentWelcomeEmailProps {
  studentName: string;
  magicLink: string;
  schoolName: string;
}

export default function StudentWelcomeEmail({
  studentName = "Student",
  magicLink = "https://yvape.org/student/magic",
  schoolName = "Your School",
}: StudentWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the YVAPE Program! Start your journey today</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎓 Welcome to YVAPE!</Heading>
          
          <Text style={text}>
            Hi {studentName},
          </Text>
          
          <Text style={text}>
            Welcome to the YVAPE program! We're excited to have you join us from {schoolName}.
          </Text>

          <Text style={text}>
            Click the magic link below to access your personalized student portal and 
            begin your journey:
          </Text>

          <Section style={buttonSection}>
            <Button style={button} href={magicLink}>
              Access My Student Portal
            </Button>
          </Section>

          <Section style={infoSection}>
            <Heading style={h2}>What's Included:</Heading>
            <ul style={list}>
              <li><strong>Program Overview:</strong> Understand what to expect</li>
              <li><strong>Interactive Content:</strong> Videos, surveys, and activities</li>
              <li><strong>Progress Tracking:</strong> See your advancement in real-time</li>
              <li><strong>One-on-One Support:</strong> Schedule personalized sessions</li>
              <li><strong>Resources:</strong> Access materials anytime</li>
            </ul>
          </Section>

          <Section style={infoSection}>
            <Heading style={h2}>Student/Parent Expectations:</Heading>
            <ul style={list}>
              <li>Work through program steps at your own pace</li>
              <li>Complete all required activities and surveys</li>
              <li>Attend scheduled appointments</li>
              <li>Ask questions when you need help</li>
              <li>Parents will receive updates (if under 18)</li>
            </ul>
          </Section>

          <Section style={tipBox}>
            <Text style={tipText}>
              💡 <strong>Pro Tip:</strong> Bookmark this email! Your magic link is unique 
              to you and provides instant access to your portal.
            </Text>
          </Section>

          <Text style={footer}>
            This is an automated email from YVAPE • The link is unique to you and 
            should not be shared
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#3b82f6",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 40px",
  textAlign: "center" as const,
};

const h2 = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "16px 0 12px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
};

const infoSection = {
  padding: "0 40px",
  margin: "24px 0",
};

const list = {
  color: "#555",
  fontSize: "14px",
  lineHeight: "24px",
  paddingLeft: "20px",
};

const buttonSection = {
  padding: "24px 40px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const tipBox = {
  backgroundColor: "#eff6ff",
  borderLeft: "4px solid #3b82f6",
  padding: "16px 20px",
  margin: "24px 40px",
  borderRadius: "4px",
};

const tipText = {
  color: "#1e40af",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  marginTop: "32px",
  textAlign: "center" as const,
};
