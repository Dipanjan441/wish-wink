import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
    href?: string;
    label?: string;
}

const DEFAULT_BACK_BUTTON_LABEL = "Back to home";

const BackButton = ({ href = ROUTES.HOME, label = DEFAULT_BACK_BUTTON_LABEL }: Props) => {
    return (
        <Link href={href} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">{label}</span>
        </Link>
    )
}

export default BackButton