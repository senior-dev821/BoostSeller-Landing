// components/Testimonials/SingleTestimonial.tsx
type SingleTestimonialProps = {
  name: string;
  company: string;
  message: string;
  avatarUrl: string;
  rating: number;
  highlighted?: boolean;
};

const SingleTestimonial: React.FC<SingleTestimonialProps> = ({
  name,
  company,
  message,
  avatarUrl,
  rating,
  highlighted,
}) => {
  return (
    <div
      className={`rounded-lg p-6 shadow-lg h-full bg-white text-center ${
        highlighted ? 'border-2 border-primary' : ''
      }`}
    >
      <div className="mb-4 mx-auto h-16 w-16 overflow-hidden rounded-full">
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      </div>
      <h4 className="text-lg font-semibold text-dark">{name}</h4>
      <p className="text-sm text-body-color mb-2">{company}</p>

      {/* Rating */}
      <div className="flex justify-center mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.211c.969 0 1.371 1.24.588 1.81l-3.41 2.475a1 1 0 00-.364 1.118l1.285 3.974c.3.921-.755 1.688-1.54 1.118l-3.41-2.475a1 1 0 00-1.175 0l-3.41 2.475c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.225 9.401c-.783-.57-.38-1.81.588-1.81h4.211a1 1 0 00.95-.69l1.286-3.974z" />
          </svg>
        ))}
      </div>

      <p className="text-base text-body-color italic">{message}</p>
    </div>
  );
};

export default SingleTestimonial;


// import { Testimonial } from "@/types/testimonial";
// import Image from "next/image";
// const starIcon = (
//   <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
//     <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
//   </svg>
// );

// const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
//   const { star, name, image, content, designation } = testimonial;

//   let ratingIcons = [];
//   for (let index = 0; index < star; index++) {
//     ratingIcons.push(
//       <span key={index} className="text-yellow">
//         {starIcon}
//       </span>,
//     );
//   }

//   return (
//     <div className="w-full h-full">
// 			<div
// 				className="group wow fadeInUp shadow-two dark:shadow-three dark:hover:shadow-gray-dark 
// 				rounded-sm bg-white p-8 duration-300 hover:shadow-one dark:bg-dark 
// 				lg:px-5 xl:px-8 flex flex-col justify-between min-h-[340px]"
// 				data-wow-delay=".1s"
// 			>

//         <div className="mb-5 flex items-center space-x-1">{ratingIcons}</div>
// 				<p className="mb-8 border-b border-body-color border-opacity-10 pb-8 text-base text-left leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white line-clamp-4 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
// 					“{content}
// 				</p>

//         <div className="flex items-center">
//           <div className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
//             <Image src={image} alt={name} fill />
//           </div>
//           <div className="w-full">
//             <h3 className="mb-1 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg">
//               {name}
//             </h3>
//             <p className="text-sm text-body-color">{designation}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleTestimonial;
