import { PatchObject } from "../models/interfaces/patch-object";
import { defineInnerProp } from "./define-inner-prop";

export function patchInnerObject<T, I = keyof(T)>(object:T,innerObjectKey: keyof(T), patch: PatchObject<I>) {
  defineInnerProp(object,innerObjectKey, {});
  object[`${innerObjectKey}`][`${patch.key}`] = patch.value;
}