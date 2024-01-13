import { SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar: React.FC = () => {
  return (
    <div className="w-full border-b-[0.5px] border-gray-800 flex justify-between items-center px-2">
      <div className="text-xl p-2">Pixel Art Maker</div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignUpButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
