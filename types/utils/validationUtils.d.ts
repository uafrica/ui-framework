/**
 * Any custom validation functions to be used by React Hook Form
 */
declare const emailRegex: RegExp;
declare const URLRegex: RegExp;
declare const contactNumberRegex: RegExp;
declare function validateEmail(value: string): Promise<boolean>;
declare function validateContactNumber(value: string): Promise<boolean>;
export { validateEmail, validateContactNumber, emailRegex, contactNumberRegex, URLRegex };
