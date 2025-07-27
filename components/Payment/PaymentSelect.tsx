'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PaymentSelect() {
  const router = useRouter();

  const handlePayment = (method: 'stripe' | 'payoneer') => {
    router.push(`/payment/${method}`);
  };

  return (
		<>
			<section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
				<div className="container">
					<div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
						<h1 className="text-2xl font-bold mb-6">Choose Your Payment Method</h1>

						<div className="space-y-4">
							<button
								onClick={() => handlePayment('stripe')}
								className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-lg border border-gray-600 hover:border-primary transition"
							>
								<Image src="/logos/stripe.png" alt="Stripe" width={100} height={40} />
								<span className="text-lg font-medium"></span>
							</button>

							<button
								onClick={() => handlePayment('payoneer')}
								className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-lg border border-gray-600 hover:border-primary transition"
							>
								<Image src="/logos/payoneer.png" alt="Payoneer" width={180} height={80} />
								<span className="text-lg font-medium"></span>
							</button>
						</div>
					</div>
				</div>
			</section>
		 
		</>
   
  );
}
