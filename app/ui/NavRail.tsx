import Link from "next/link";

const NavRail = ({ links }) => {
  return (
    <div>
      {links.map((link: { key: String; name: String; href: String }) => (
        <Link key={link.name} href={link.href}>
          <p>{link.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default NavRail;
