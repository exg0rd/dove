import React from "react";

import { comforta } from "@/app/layout";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    formName: string;
}

export const Modal: React.FC<Props> = ({ open, onClose, children, title, formName }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={handleClose}>
            <DialogContent
                className={cn(comforta.className, "sm:max-w-[425px]")}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription></DialogDescription>
                   
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleClose}
                        form={formName}>
                        Сохранить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
