import { ModeToggle } from '@components/ThemeProvider';

const Footer = () => {
  return (
    <footer className="bg-muted h-footer px-4 md:px-8 lg:px-16 xl:px-40">
      <div className="flex items-center justify-between mx-auto max-w-screen-xl p-4">
        <span className="text-sm sm:text-center text-gray-400">
          © 2024{' '}
          <a href="#" className="hover:underline">
            CaseLab team3
          </a>
        </span>
        <div>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
