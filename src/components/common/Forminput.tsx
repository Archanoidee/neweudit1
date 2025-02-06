import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/shadcn/input";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const FormInput = ({ name, type, placeholder, label, ...props }: Props) => {
  return (
    <div className="mb-4">
      {/* Dynamic label with accessible htmlFor */}
      <Label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id={name} // Ensure the id matches the label's htmlFor
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        type={type}
        name={name}
        placeholder={placeholder}
        {...props} // Pass all additional props dynamically
      />
    </div>
  );
};

export default FormInput;
