import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
type AlertType = "success" | "error" | "warning" | "info";
type AlertToastProps = { type: AlertType; title?: string; description?: string; onClose: () => void; };
const styles = { success: { border: "border-green-400", bg: "bg-green-50", title: "text-green-700", desc: "text-green-600", close: "text-green-500 hover:text-green-700", }, error: { border: "border-red-700", bg: "bg-red-50", title: "text-red-700", desc: "text-red-600", close: "text-red-500 hover:text-red-700", }, warning: { border: "border-yellow-400", bg: "bg-yellow-50", title: "text-yellow-700", desc: "text-yellow-600", close: "text-yellow-500 hover:text-yellow-700", }, info: { border: "border-blue-400", bg: "bg-blue-50", title: "text-blue-700", desc: "text-blue-600", close: "text-blue-500 hover:text-blue-700", }, };
const AlertToast = ({ type, title, description, onClose }: AlertToastProps) => {
    const [closing, setClosing] = useState(false);
    const s = styles[type];
    const toastRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 400);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toastRef.current && !toastRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={toastRef}
            className={`fixed right-4 top-4 max-w-89 w-full
              ${closing ? "animation-out" : "animation-in"}
            `}
        >
            <div className={`flex items-start gap-3 shadow-toast rounded-md border p-4 ${s.border} ${s.bg}`}>
                <div>
                    <p className={`font-semibold text-base ${s.title}`}>{title}</p>
                    {description && (
                        <p className={`text-sm text-gray-600`}>{description}</p>
                    )}
                </div>

                <button onClick={handleClose} className={`ml-auto text-gray-600`}>
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default AlertToast;
