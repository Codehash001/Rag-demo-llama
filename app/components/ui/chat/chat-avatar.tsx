import Image from "next/image";

export default function ChatAvatar({ role }: { role: string }) {
  if (role === "user") {
    return (
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md  ">
        <Image
        className="rounded-md"
        src="/man.png"
        alt="man Logo"
        width={26}
        height={26}
        priority
      />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md  text-white ">
      <Image
        className="rounded-md"
        src="/chatbot.png"
        alt="chatbot Logo"
        width={26}
        height={26}
        priority
      />
    </div>
  );
}
