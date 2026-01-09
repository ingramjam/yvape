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

interface AdminConfirmationEmailProps {
  adminName: string;
  schoolName: string;
  studentName: string;
  enrollmentUrl: string;
}

export default function AdminConfirmationEmail({
  adminName = "School Administrator",
  schoolName = "Your School",
  studentName = "John Doe",
  enrollmentUrl = "https://yvape.org/admin/students",
}: AdminConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New student enrolled in YVAPE program</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🦄 YVAPE Program Enrollment</Heading>
          
          <Text style={text}>
            Hi {adminName},
          </Text>
          
          <Text style={text}>
            Great news! <strong>{studentName}</strong> has been successfully enrolled 
            in the YVAPE program at {schoolName}.
          </Text>

          <Section style={infoSection}>
            <Heading style={h2}>Program Next Steps</Heading>
            <ul style={list}>
              <li>Student will receive a welcome email with magic link access</li>
              <li>Track student progress through your admin dashboard</li>
              <li>Receive automated progress updates</li>
              <li>Access monthly reports for your school</li>
            </ul>
          </Section>

          <Section style={infoSection}>
            <Heading style={h2}>Student/Parent Expectations</Heading>
            <ul style={list}>
              <li>Complete program modules at their own pace</li>
              <li>Watch instructional videos and complete surveys</li>
              <li>Schedule one-on-one sessions as needed</li>
              <li>Parents receive updates if student is under 18</li>
            </ul>
          </Section>

          <Section style={infoSection}>
            <Heading style={h2}>School Admin Expectations</Heading>
            <ul style={list}>
              <li>Monitor student progress through the admin portal</li>
              <li>Review monthly school-wide reports</li>
              <li>Support students who need additional assistance</li>
              <li>Provide feedback to improve the program</li>
            </ul>
          </Section>

          <Section style={buttonSection}>
            <Button style={button} href={enrollmentUrl}>
              View Student Dashboard
            </Button>
          </Section>

          <Text style={footer}>
            This is an automated email from YVAPE for {schoolName}
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
  color: "#7c3aed",
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
  backgroundColor: "#7c3aed",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  marginTop: "32px",
  textAlign: "center" as const,
};
