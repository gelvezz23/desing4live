import { FC } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import "./alerts.scss";
export const Alerts: FC<{ message: string; type: AlertColor }> = ({
  message,
  type,
}) => {
  return (
    <section className="alerts">
      <Alert severity={type}>{message}</Alert>
    </section>
  );
};
