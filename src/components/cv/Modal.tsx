

import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-half md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-xl">
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
}
