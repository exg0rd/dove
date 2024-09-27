import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Spinner } from "./Spinner";
import React, { ReactNode, useState } from "react";


interface Props { 
    className?: string;
    children?: React.ReactNode;
    loading: any;
}

export const SubmitButton: React.FC<Props> = ({ className, children, loading }) => {
    const [pending, setPending] = useState(loading);

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