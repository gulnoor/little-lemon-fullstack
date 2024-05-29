import Link from "next/link";

export default function Home() {
  const LINKS = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Reservation", href: "/reservation" },
    { name: "Login", href: "/login" },
  ];
  return (
    <main className="">
      <h1>Home Page</h1>
      {LINKS.map((link) => (
        <Link key={link.name} href={link.href}>
          <p>{link.name}</p>
        </Link>
      ))}
    </main>
  );
}
