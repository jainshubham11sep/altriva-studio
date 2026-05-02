import { mainNavLinks } from "@/lib/products";

export default function CategoryTabs() {
  return (
    <nav className="sub-nav">
      {mainNavLinks.map((link) => (
        <a key={link.label} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
