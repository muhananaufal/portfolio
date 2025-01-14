import React, { useRef } from 'react';
import ButtonContact from '@/components/ButtonContact';
import { toast } from 'sonner';

const Form = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const companyRef = useRef<HTMLInputElement>(null);
	const goalRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const budgetRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const detailsRef = useRef<HTMLInputElement>(null);

	const handleSendInquiry = () => {
		const name = nameRef.current?.value.trim() || '';
		const company = companyRef.current?.value.trim() || '';
		const goal = goalRef.current?.value.trim() || '';
		const date = dateRef.current?.value.trim() || '';
		const budget = budgetRef.current?.value.trim() || '';
		const email = emailRef.current?.value.trim() || '';

		// Validasi: Jika ada field yang kosong, tampilkan toaster error
		if (!name || !company || !goal || !date || !budget || !email) {
			toast.error('All fields are required except Additional Details.');
			return;
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			toast.error('Please enter a valid email address.');
			return;
		}

		const datePattern = /^\d{4}-\d{2}-\d{2}$/;
		if (!datePattern.test(date) || isNaN(Date.parse(date))) {
			toast.error('Please enter a valid date in the format YYYY-MM-DD.');
			return;
		}

		const budgetPattern = /^\$\d+(\.\d{2})?$/;
		if (!budgetPattern.test(budget)) {
			toast.error('Please enter a valid budget in the format $123.45.');
			return;
		}

		const details = detailsRef.current?.value.trim() || '';

		const subject = `Inquiry from ${name}`;
		const body =
			`Hi, my name is ${name}\n` +
			`I work with ${company}\n` +
			`I’m looking for a partner to help me with: ${goal}\n` +
			`Aiming to complete it by: ${date}\n` +
			`My budget range is: ${budget}\n` +
			`You can reach me at: ${email}\n` +
			`Additional details: ${details}`;

		const mailtoURL = `https://mail.google.com/mail/u/0/?fs=0&to=muhananaufal8@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=cm`;

		toast.success('Inquiry sent successfully!');
		window.location.href = mailtoURL;
	};

	return (
		<section className="w-full padding-x padding-y">
			<div className="w-full flex flex-col gap-[15px]">
				<div className="w-full flex gap-[15px] sm:flex-col xm:flex-col md:flex-col">
					<div className="flex gap-[10px] w-[50%] md:w-auto sm:w-auto xm:w-auto sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">Hi! My name is</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Enter your name*"
								ref={nameRef}
								className="paragraph bg-transparent w-full font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out sm:w-full xm:w-full"
							/>
						</div>
					</div>
					<div className="flex gap-[10px] w-[50%] md:w-auto sm:w-auto xm:w-auto sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">, and I work with</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Company name type here*"
								ref={companyRef}
								className="paragraph bg-transparent w-full font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>
				{/* Input lainnya */}
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">I&apos;m seeking a partner to assist me with</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Your goal type here*"
								ref={goalRef}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">Aiming to have it completed by</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="YYYY-MM-DD*"
								ref={dateRef}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">My budget for this project is approximately</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="$123.45*"
								ref={budgetRef}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">Feel free to reach out to me at</h2>
						</div>
						<div className="w-full">
							<input
								type="email"
								placeholder="muhananaufal@example.com*"
								ref={emailRef}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">to discuss further.</h2>
						</div>
					</div>
				</div>
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">Optionally, I&apos;m sharing more:</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Product details type here..."
								ref={detailsRef}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-end sm:justify-start xm:justify-start pt-[50px]">
				<div className="flex sm:flex-col xm:flex-col md:flex-col gap-[25px]">
					<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
						<ButtonContact bgcolor="#35292E" title="send inquiry" className="bg-white" onClick={handleSendInquiry} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Form;
