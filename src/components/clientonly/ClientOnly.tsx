import { useEffect, useState, ReactNode } from "react";

// Client-only wrapper
interface ClientOnlyComponentProps {
  children: ReactNode;
}

const ClientOnlyComponent: React.FC<ClientOnlyComponentProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will run only on the client side
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner, or nothing, depending on your use case
  }

  return <>{children}</>;
};

export default ClientOnlyComponent;
