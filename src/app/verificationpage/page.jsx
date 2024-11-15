import "./VerificationPage.scss";

export default function VerificationPage() {
  return (
    <div className="verification-page">
      <h1>Please Check Your Email For Verification</h1>
      <p>If you don't see it, please check your spam folder or request another email.</p>
      <button className="check-email-btn">Resend Email</button>
    </div>
  );
}
