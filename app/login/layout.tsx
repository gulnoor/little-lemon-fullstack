import cat from "@/public/assets/images/a cute cat made of lemons.png";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* <h1 className="mb-12 max-w-[600px]">Welcome to Little Lemon</h1> */}
      <div className="flex justify-center">
        {children}
        <Image
          className="hidden lg:block  w-2/5 mx-auto"
          src={cat}
          alt={`Little Lemon Logo`}
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
}
