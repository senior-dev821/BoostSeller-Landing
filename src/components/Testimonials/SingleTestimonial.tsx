// components/Testimonials/SingleTestimonial.tsx
import Image from "next/image";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

type SingleTestimonialProps = {
  name: string;
  company: string;
  message: string;
  avatarUrl: string;
  rating: number;
};

const SingleTestimonial: React.FC<SingleTestimonialProps> = ({
  name,
  company,
  message,
  avatarUrl,
  rating,
}) => {
	let ratingIcons = [];
  for (let index = 0; index < rating; index++) {
    ratingIcons.push(
      <span key={index} className="text-yellow">
        {starIcon}
      </span>,
    );
  }

	const isValidAvatar = avatarUrl && avatarUrl.trim() !== "";
  return (
		<div className="w-full">
		<div
			className="wow fadeInUp shadow-two dark:shadow-three dark:hover:shadow-gray-dark rounded-sm bg-white p-8 duration-300 hover:shadow-one dark:bg-dark lg:px-5 xl:px-8"
			data-wow-delay=".1s"
		>
			<div className="mb-5 flex items-center justify-center space-x-1">{ratingIcons}</div>
			<p className="mb-8 border-b border-body-color border-opacity-10 pb-8 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
				{message}
			</p>
			<div className="flex items-center">
				<div className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
					{isValidAvatar ? (
              <Image
                src={`https://cp.boostseller.ai${avatarUrl}`}
                alt={name}
                fill
              />
            ) : (
              <Image
                src={`/images/avatar/default.jpg`}
                alt={name}
                fill
              />
            )}
				</div>
				<div className="w-full">
					<h3 className="mb-1 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg">
						{name}
					</h3>
					<p className="text-sm text-body-color">{company}</p>
				</div>
			</div>
		</div>
	</div>
  );
};

export default SingleTestimonial;