import { ChangeEvent } from "react";

export type FormControlChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {name?: string, value: any}>