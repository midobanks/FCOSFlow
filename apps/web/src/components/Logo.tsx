import Image from 'next/image';

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function Logo({ className, width = 180, height = 48 }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="FCOS Flow"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
