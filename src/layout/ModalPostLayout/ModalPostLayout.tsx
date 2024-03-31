import { X } from "lucide-react";
import React from "react";

const ModalPostLayout = ({ children, handleModalPost }: { children: React.ReactNode, handleModalPost: () => void }) => {
    return (
        <nav className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 " style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="bg-white rounded-lg">
                <div className="p-4 flex flex-col">
                    <header className="flex self-end">
                        <X onClick={handleModalPost} className="cursor-pointer" />
                    </header>
                    {children}
                </div>
            </div>
        </nav>
    );
}

export default ModalPostLayout;