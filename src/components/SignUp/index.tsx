"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const SignupForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const selectedPlan = localStorage.getItem("selectedPlan");
    if (!selectedPlan) return setError("Plan not selected. Go back to pricing.");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!agreeTerms) {
      return setError("You must agree to the Terms and Privacy Policy.");
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, selectedPlan }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      router.push("/verify?email=" + encodeURIComponent(form.email));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
		<>
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Create your account
              </h3>
              <p className="mb-6 text-center text-base font-medium text-body-color">
                It’s totally free and super easy
              </p>

              {error && (
                <p className="mb-6 text-center text-sm text-red-600">{error}</p>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-4">
                  <label htmlFor="name" className="mb-1 block text-sm text-dark dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="mb-1 block text-sm text-dark dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="mb-1 block text-sm text-dark dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label htmlFor="password" className="mb-1 block text-sm text-dark dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                    className="w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="mb-1 block text-sm text-dark dark:text-white">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter password"
                    className="w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="mb-6 flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    className="mt-1 h-5 w-5 shrink-0 rounded border border-body-color/50 dark:border-white/20"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-body-color dark:text-white">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-sm bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 hover:bg-primary/90"
                >
                  Sign up
                </button>
              </form>

              <p className="mt-6 text-center text-base font-medium text-body-color">
                Already using BoostSeller?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupForm;
