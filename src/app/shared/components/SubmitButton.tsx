import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Spinner } from "./Spinner";
import React, { ReactNode } from "react";


interface Props { 
    className?: string;
    children?: React.ReactNode;
}

export const SubmitButton: React.FC<Props> = ({ className, children }) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            type="submit"
            variant={"default"}
            className={className}>
              {pending ? (
                <>
                    <Spinner />
                </>
            ) : (
                children
            )}
        </Button>
    );
}