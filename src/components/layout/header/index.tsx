import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CurrentPath from "./current-path";
// import { usePathname } from "next/navigation";
import NavLinks from "./nav-links";

const Header = ({ className }: { className?: string }) => {
  // const pathname = usePathname();
  // if (pathname === "/login") return null;
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 bg-white shadow-sm",
        className
      )}
    >
      <div className="flex h-full items-center justify-between dark:bg-gray-950/90">
        <div className="flex gap-10">
          <Link href="/landing" className="relative h-16 w-20" prefetch={false}>
            <Image
              src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1446816802/mzzqlne1z4j96bodj1d8.png"
              alt="Logo"
              className="object-cover"
              fill
            />
          </Link>
          <CurrentPath />
        </div>
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
