import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactNode;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div className="h-10" />,
}: PlaceholderProps) => {
  return (
    <div className="flex flex-1 flex-col self-center items-center justify-center">
      {icon &&
        cloneElement(icon, {
          className: "w-16 h-16 mb-4 text-muted-foreground",
        } as React.SVGProps<SVGSVGElement>)}

      <h2 className="text-lg text-center">{label}</h2>

      {cloneElement(
        button as React.ReactElement,
        {
          className: "mt-4",
        } as React.HTMLAttributes<HTMLDivElement>
      )}
    </div>
  );
};

export { Placeholder };
