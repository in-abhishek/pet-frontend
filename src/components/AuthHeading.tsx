import React from "react";

interface AuthHeadingProps {
  subheading?: string;
  content?: string;
}

const AuthHeading: React.FC<AuthHeadingProps> = ({ subheading, content }) => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-primaryLogo text-[36px] font-semibold text-center">
        Pet Adoption
      </h1>
      <div className="flex flex-col flex-start gap-2">
        <h2 className="text-2xl font-bold text-text-secondary tracking-[-0.24px]">{subheading}</h2>
        <p className=" text-gray-500 text-base">{content}</p>
      </div>
    </div>
  );
};

export default AuthHeading;
