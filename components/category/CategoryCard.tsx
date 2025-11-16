import Link from "next/link";
import BlurCard from "@/components/ui/BlurCard";

export default function CategoryCard({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: string;
}) {
  return (
    <Link href={href}>
      <BlurCard className="p-4 flex flex-col items-center justify-center text-center">
        <span className="text-3xl mb-2">{icon}</span>
        <span className="text-sm font-medium tracking-wide">{name}</span>
      </BlurCard>
    </Link>
  );
}
