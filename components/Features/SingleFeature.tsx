// components/Features/SingleFeature.tsx
type SingleFeatureProps = {
  title: string;
  description: string;
  icon: string;
};

const SingleFeature: React.FC<SingleFeatureProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">{icon}</div> {/* Could replace with image or icon component */}
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">{title}</h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">{description}</p>
      </div>
    </div>
  );
};

export default SingleFeature;
