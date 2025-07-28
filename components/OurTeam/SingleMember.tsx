
import Image from "next/image";
type SingleMemberProps = {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
};

const SingleMember: React.FC<SingleMemberProps> = ({
  name,
  role,
  bio,
  avatarUrl,
}) => {
	const isValidAvatar = avatarUrl && avatarUrl.trim() !== "";
  return (
    <div className="w-full h-full">
			<div className="group bg-white dark:bg-dark p-6 rounded-sm shadow-two dark:shadow-three hover:shadow-one transition-all duration-300 min-h-[220px]">
				<div className="flex items-start space-x-4">
					{/* Image */}
					<div className="relative w-[120px] h-[168px] overflow-hidden rounded-md flex-shrink-0">
					{isValidAvatar ? (
              <Image
                src={avatarUrl}
                alt={name}
                width={120}
                height={168}
                className="object-cover rounded-md"
              />
            ) : (
              <div className="w-[120px] h-[168px] bg-gray-300 rounded-md flex items-center justify-center text-sm text-gray-600">
                No Image
              </div>
            )}
					</div>

					{/* Text */}
					<div className="flex flex-col justify-start">
						<h3 className="text-lg font-semibold text-dark dark:text-white">{name}</h3>
						<p className="text-sm text-body-color mb-2 border-b border-body-color ">{role}</p>
						
						{/* Truncated by default, full on hover */}
						<p className="text-base leading-relaxed text-body-color dark:text-white line-clamp-4 group-hover:line-clamp-none transition-all duration-300 ease-in-out text-left">
							{bio}
						</p>
					</div>
				</div>
			</div>
    </div>
  );
};

export default SingleMember;
