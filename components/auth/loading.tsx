import Image from "next/image";

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src="/navigator.jpg"
        alt="logo"
        width={80}
        height={80}
        className="animate-pulse duration-700"
      />
    </div>
  );
};
