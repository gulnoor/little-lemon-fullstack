import cat from "@/public/assets/images/a cute cat made of lemons.png";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1 className="mb-12 max-w-[600px]">Welcome to Little Lemon</h1>
      <div className="flex">
        {children}
        <Image
          className="hidden md:block w-1/4 mx-auto"
          src={cat}
          alt={`Little Lemon Logo`}
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
}
