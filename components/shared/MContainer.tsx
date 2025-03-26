import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const MContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex justify-center w-full px-4">
      <div className="max-w-4xl w-full">{children}</div>
    </div>
  );
};

export default MContainer;
