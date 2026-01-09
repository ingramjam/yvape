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

interface ParentWelcomeEmailProps {
  parentName: string;
  studentName: string;
  schoolName: string;
  portalUrl: string;
}

export default function ParentWelcomeEmail({
  parentName = "Parent/Guardian",
  studentName = "Your Student",
  schoolName = "School Name",
  portalUrl = "https://yvape.org",
}: ParentWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{studentName} is enrolled in the YVAPE program</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🦄 YVAPE Program Parent Welcome</Heading>
          
          <Text style={text}>
            Dear {parentName},
          </Text>
          
          <Text style={text}>
            Your student, <strong>{studentName}</strong>, has been enrolled in the 
            YVAPE (Youth Vaping Prevention and Education) program at {schoolName}.
          </Text>

          <Section style={infoSection}>
            <Heading style={h2}>Program Overview</Heading>
            <Text style={text}>
              YVAPE is a comprehensive program designed to educate young people about 
              the risks of vaping and support them in making healthier choices. The 
              program includes:
            </Text>
            <ul style={list}>
              <li>Educational videos and interactive content</li>
              <li>Self-paced learning modules</li>
              <li>Progress tracking and assessments</li>
              <li>Optional one-on-one support sessions</li>
            </ul>
          </Section>

          <Section style={infoSection}>
            <Heading style={h2}>What to Expect</Heading>
            <ul style={list}>
              <li><strong>Passive Consent:</strong> Your student can participate unless you opt out</li>
              <li><strong>Privacy:</strong> All student progress is confidential</li>
              <li><strong>Updates:</strong> You'll receive progress notifications</li>
              <li><strong>Support:</strong> Contact the school with questions</li>
            </ul>
          </Section>

          <Section style={infoSection}>
            <Heading style={h2}>Student/Parent Expectations</Heading>
            <ul style={list}>
              <li>Students complete program at their own pace</li>
              <li>Estimated time commitment: 2-3 hours total</li>
              <li>All activities are age-appropriate and educational</li>
              <li>Parents can request opt-out by contacting the school</li>
            </ul>
          </Section>

          <Section style={noteBox}>
            <Text style={noteText}>
              <strong>Note for Parents:</strong> If you have any concerns or wish to 
              opt your student out of this program, please contact {schoolName} directly.
            </Text>
          </Section>

          <Section style={buttonSection}>
            <Button style={button} href={portalUrl}>
              Learn More About YVAPE
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
  margin: "12px 0",
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
  margin: "12px 0",
};

const buttonSection = {
  padding: "24px 40px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#f97316",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const noteBox = {
  backgroundColor: "#fff7ed",
  borderLeft: "4px solid #f97316",
  padding: "16px 20px",
  margin: "24px 40px",
  borderRadius: "4px",
};

const noteText = {
  color: "#7c2d12",
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
