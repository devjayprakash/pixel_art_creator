'use client';
import { SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-full p-3 border-b-[0.5px] border-gray-800 flex justify-between items-center px-2">
      <div className="text-xl p-2">Pixel Art Maker</div>
      <div>
        <SignedIn>
          <div className="flex gap-3">
            {pathname === '/' && (
              <Link href={'/editor'}>
                <Button color="primary">Create new post</Button>
              </Link>
            )}
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignUpButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
