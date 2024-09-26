import { SignupFormSchema, FormState, LoginFormSchema } from "../../lib/definitions";

export function signupValidate(formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        repeatPassword: formData.get("repeatPassword")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { username, email, password } = validatedFields.data;

    return { username, email, password };
}

export function loginValidate(formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { username, password } = validatedFields.data;
    return { username, password }
}
