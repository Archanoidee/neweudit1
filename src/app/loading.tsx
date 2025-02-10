import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="grid min-h-dvh place-items-center bg-secondary-gray-cloud">
      <Loader
        className="text-primary-blue [animation:spin_1.5s_linear_infinite]"
        size={50}
      />
    </div>
  );
};

export default Loading;
