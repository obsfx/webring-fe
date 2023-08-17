import { WarningBox } from "@/components/WarningBox";

export function NotFound() {
  return (
    <div>
      <WarningBox>
        <span>404</span> could not found this page.
      </WarningBox>
      <a href="/">Go back to home</a>
    </div>
  );
}
