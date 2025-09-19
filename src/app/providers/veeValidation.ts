import { configure } from "vee-validate";

export function setupVeeValidationConfig() {
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: false,
  })
}
