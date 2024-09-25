import React from "react";

interface AuthFormInputProps {
    className?: string;
    type: 'email' | 'username' | 'password' | 'repeatPassword';
    description: string;
    errorDescription?: string | string[] | undefined;
    successDescription?: string | undefined;
}

const isStringArray = (errorDescription: string | string[] | undefined) => {
    return (typeof(errorDescription) !== "string" && errorDescription);
};

const inputTypeMap = {
    email: 'email',
    username: 'text',
    password: 'password',
    repeatPassword: 'password',
};

export const AuthFormInput: React.FC<AuthFormInputProps> = ({
    className,
    type,
    description,
    errorDescription,
    successDescription
}) => {
    return (
        <div className={className}>
            <label
                htmlFor={type}
                className="block mb-2 text-lg font-extrabold text-pink-700">
                {description}
            </label>
            <input
                id={type}
                name={type}
                type={inputTypeMap[type]}
                autoComplete='on'
                placeholder={description}
                required
                className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"
            />
            {(isStringArray(errorDescription) && errorDescription) ? (
                <ul className="mt-3 space-y-1 text-sm text-red-300">
                    {errorDescription.map((error : string) => (
                        <li key={error}>
                            <p className="mt-3 text-sm text-red-300">{error}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-3 text-sm text-red-300">{errorDescription}</p>
            )}
            {<p className="mt-3 text-sm text-green-300">{successDescription}</p>}
        </div>
    );
};
