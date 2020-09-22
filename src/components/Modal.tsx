import React from "react";
import { createPortal } from "react-dom";

interface ModalProps{
    children: React.ReactChild;
}

const Modal = React.memo(({ children }: ModalProps) => {
    const domEl = document.getElementById('modal');

    if (!domEl) return null;

    return createPortal(
        children,
        domEl
    )
});

export default Modal;
