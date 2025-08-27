import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  imageSize?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ 
  className = '', 
  imageSize = 'md',
  showText = true 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-12 w-12'
  };

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className={`relative ${sizeClasses[imageSize]} flex-shrink-0`}>
        <Image
          src="/logo/workflow-automation-logo-white-bg.svg"
          alt="Workflow Automation"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="hidden sm:flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white font-outfit">
            Workflow Automation
          </span>
        </div>
      )}
    </Link>
  );
}