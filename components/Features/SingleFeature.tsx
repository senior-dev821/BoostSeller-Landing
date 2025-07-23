// components/Features/SingleFeature.tsx
type SingleFeatureProps = {
  title: string;
  description: string;
  icon: string;
  highlighted?: boolean;
};

const SingleFeature: React.FC<SingleFeatureProps> = ({
  title,
  description,
  icon,
  highlighted,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-10">
      <div
        className={`rounded-xl p-8 shadow-lg h-full text-center ${
          highlighted ? 'bg-primary text-white' : 'bg-white'
        }`}
      >
        <div className="mb-5 text-5xl">{icon}</div> {/* Could replace with image or icon component */}
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

export default SingleFeature;
