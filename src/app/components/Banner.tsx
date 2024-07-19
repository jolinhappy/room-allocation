type BannerVariant = 'primary' | 'error';
interface BannerProps {
  title?: string;
  describe: string;
  variant?: BannerVariant;
}
const Banner = ({ title, describe, variant = 'primary' }: BannerProps) => {
  const bannerStyleDependOnVariant = {
    primary: 'bg-primary-100 border-primary-16',
    error: 'bg-red-100 border-red-500',
  };
  return (
    <div className={`p-4 w-full border border-solid ${bannerStyleDependOnVariant[variant]} rounded-[4px]`}>
      {
        <>
          {title && <h5 className="text-[20px] text-black mb-4 font-bold">{title}</h5>}
          <p className="text-[14px] text-black-300">{describe}</p>
        </>
      }
    </div>
  );
};

export default Banner;
