import SignUpBox from "./SignUpBox";
import SignInBox from "./SignInBox";
const SignUp = () => {
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
				<div className="-mx-4 flex flex-wrap">
					<div className="w-full px-4 lg:w-7/12 xl:w-8/12">
						<SignUpBox />
					</div>
					<div className="w-full px-4 lg:w-5/12 xl:w-4/12 ">
						<SignInBox />
					</div>
				</div>
			</div>
    </section>
  );
};

export default SignUp;
