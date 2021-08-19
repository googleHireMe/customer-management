import { ChangeEventTargetType } from "../models/interfaces/change-event-target-type.enum";
import { FormControlChangeEvent } from "../models/interfaces/form-control-change-event";

export function parseChangeEvent(event: FormControlChangeEvent): { key: string, value: string | number | any } {
  const { target } = event;
  const key = target.name;
  const type = target['type'];
  const rowValue = ChangeEventTargetType.Checkbox === type ? target['checked'] : target.value;
  let value: string | number | boolean = rowValue;
  if (type === ChangeEventTargetType.Number) { value = +rowValue }
  return { key, value };
}