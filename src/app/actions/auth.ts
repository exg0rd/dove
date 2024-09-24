import { SignupFormSchema, FormState } from "../shared/lib/definitions";

export async function signup(state: FormState, formData: FormData) {
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

    return { message : "Регистрация успешна!"}
}
