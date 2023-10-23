/**
 * Any custom validation functions to be used by React Hook Form
 */
import { useForm } from "react-hook-form";

const emailRegex =
  /^((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})),?;? ?)+$/;

// Regex to check for valid URL
const URLRegex = /^(?=.*[a-z])[a-zA-Z0-9()\s.'-]+$/i;

const contactNumberRegex =
  /^((([+]{1}[0-9]{10,12})|([0-9]{10}))|[+]?1?\(?\d{3}[\-\)\.\s]?\d{3}[\-\.\s]?\d{4}|[+]?1?\(?\d{4}[\-\)\.\s]?\d{3}[\-\.\s]?\d{4})[-\s\.]*?$/;

async function validateEmail(value: string) {
  let valid = value.length === 0 || emailRegex.exec(value);
  return !!valid;
}

async function validateContactNumber(value: string) {
  // Number should consist of (possibly) the plus symbol, followed some amount of number values.
  // The amount of numbers can vary due to country codes ranging in length.
  // Accepted length of phone number with no country code is 10.
  let regex = /^([+]*[0-9]{10,}|[0-9]{10})$/;
  let valid = value.length === 0 || regex.exec(value);
  return Boolean(valid);
}

function withValidation(Component: any) {
  return function WrappedComponent(props: any) {
    const { register, handleSubmit, watch, reset, errors, clearErrors, trigger, setValue } =
      useForm();
    let validation = {
      register,
      handleSubmit,
      watch,
      reset,
      errors,
      clearErrors,
      trigger,
      setValue
    };

    return <Component {...props} validation={validation} />;
  };
}

export {
  validateEmail,
  validateContactNumber,
  emailRegex,
  contactNumberRegex,
  URLRegex,
  withValidation
};
