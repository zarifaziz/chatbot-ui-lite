import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center">
      <p className="text-xs text-gray-500">
        Presented by the Straya team for the Pinecone 2023 Hackathon
      </p>
    </div>
  );
};
