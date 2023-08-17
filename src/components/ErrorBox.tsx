export function ErrorBox({ children }: { children: any }) {
  return (
    <div className="error-box">
      <div className="error-box-title">An error occurred:</div>
      <div className="error-box-content">{children}</div>
    </div>
  );
}
