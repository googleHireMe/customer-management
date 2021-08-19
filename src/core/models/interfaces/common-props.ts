import { ChangeEvent } from "react";

export interface CommonProps {
  fullWidth?: boolean;
  onChange?: (event: ChangeEvent) => void;
}