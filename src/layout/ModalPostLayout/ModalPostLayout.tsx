import { X } from "lucide-react";
import React from "react";

const ModalPostLayout = ({ children, handleModalPost }: { children: React.ReactNode, handleModalPost: () => void }) => {
    return (
        <nav className="fixed z-30 top-0 left-0 w-full min-h-screen flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <div className=" bg-white rounded-lg mx-4">
                <div className="flex flex-col" style={{ padding: '1.5rem'}}>
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