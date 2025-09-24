// container/contact-page/Form.tsx

'use client';

import React, { useRef } from 'react';
import ButtonContact from '@/components/ButtonContact';
// PERBAIKAN 1: Hapus import 'sonner'
// import { toast } from 'sonner';
// PERBAIKAN 2: Ganti dengan import store toast kustom kita
import { useToastStore } from '@/store/useToastStore';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	company: z.string().min(1, 'Company name is required'),
	goal: z.string().min(1, 'Goal is required'),
	date: z
		.string()
		.min(1, 'Date is required')
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid format (YYYY-MM-DD)')
		.refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
	budget: z
		.string()
		.min(1, 'Budget is required')
		.regex(/^\$\d+(\.\d{2})?$/, 'Invalid format ($123.45)'),
	email: z.string().email('Please enter a valid email address'),
	details: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Form = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const addToast = useToastStore((state) => state.addToast);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		shouldFocusError: false,
	});

	const onSubmit = (data: FormData) => {
		const { name, company, goal, date, budget, email, details } = data;
		const subject = `Inquiry from ${name}`;
		const body =
			`Hi, my name is ${name}\n` +
			`I work with ${company}\n` +
			`I’m looking for a partner to help me with: ${goal}\n` +
			`Aiming to complete it by: ${date}\n` +
			`My budget range is: ${budget}\n` +
			`You can reach me at: ${email}\n` +
			`Additional details: ${details || 'N/A'}`;
		const mailtoURL = `https://mail.google.com/mail/u/0/?fs=0&to=muhananaufal8@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=cm`;

		// Panggil toast kustom kita untuk notifikasi sukses
		addToast('Inquiry sent successfully!', 'success');
		window.location.href = mailtoURL;
	};

	const onError = (errorFields: typeof errors) => {
		const firstErrorField = Object.keys(errorFields)[0];
		if (firstErrorField) {
			const errorMessage = errorFields[firstErrorField as keyof typeof errors]?.message;

			// PERBAIKAN 4: Gunakan `addToast` untuk menampilkan error
			if (errorMessage) {
				addToast(errorMessage, 'error');
			}

			const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
			if (element) {
				gsap.to(window, {
					duration: 1.2,
					scrollTo: {
						y: formRef.current,
						offsetY: 120,
					},
					ease: 'power2.inOut',
					onComplete: () => {
						element.focus();
					},
				});
			}
		}
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)} className="w-full padding-x padding-y">
			<div className="w-full flex flex-col gap-[15px]">
				<div className="w-full flex gap-[15px] sm:flex-col xm:flex-col md:flex-col">
					<div className="flex gap-[10px] w-[50%] md:w-auto sm:w-auto xm:w-auto sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">Hi! My name is</h2>
						</div>
						<div className="w-full relative pb-5">
							<input
								type="text"
								placeholder="Enter your name*"
								{...register('name')}
								className="paragraph bg-transparent w-full font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out sm:w-full xm:w-full"
							/>
							{errors.name && <p className="absolute left-0 bottom-0 w-full text-red-500 text-xs text-center sm:text-left">{errors.name.message}</p>}
						</div>
					</div>
					<div className="flex gap-[10px] w-[50%] md:w-auto sm:w-auto xm:w-auto sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">, and I work with</h2>
						</div>
						<div className="w-full relative pb-5">
							<input
								type="text"
								placeholder="Company name type here*"
								{...register('company')}
								className="paragraph bg-transparent w-full font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out sm:w-full xm:w-full"
							/>
							{errors.company && <p className="absolute left-0 bottom-0 w-full text-red-500 text-xs text-center sm:text-left">{errors.company.message}</p>}
						</div>
					</div>
				</div>
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">I&apos;m seeking a partner to assist me with</h2>
						</div>
						<div className="w-full relative pb-5">
							<input
								type="text"
								placeholder="Your goal type here*"
								{...register('goal')}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
							{errors.goal && <p className="absolute left-0 bottom-0 w-full text-red-500 text-xs text-center sm:text-left">{errors.goal.message}</p>}
						</div>
					</div>
				</div>
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">Aiming to have it completed by</h2>
						</div>
						<div className="w-full relative pb-5">
							<input
								type="text"
								placeholder="YYYY-MM-DD*"
								{...register('date')}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
							{errors.date && <p className="absolute left-0 bottom-0 w-full text-red-500 text-xs text-center sm:text-left">{errors.date.message}</p>}
						</div>
					</div>
				</div>
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">My budget for this project is approximately</h2>
						</div>
						<div className="w-full relative pb-5">
							<input
								type="text"
								placeholder="$123.45*"
								{...register('budget')}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
							{errors.budget && <p className="absolute left-0 bottom-0 w-full text-red-500 text-xs text-center sm:text-left">{errors.budget.message}</p>}
						</div>
					</div>
				</div>
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col md:flex-col">
						<div className="xl:min-w-max lg:min-w-max ">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry blend-target">Feel free to reach out to me at</h2>
						</div>
						<div className="w-full relative pb-5">
							<input
								type="email"
								placeholder="muhananaufal@example.com*"
								{...register('email')}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
							{errors.email && <p className="absolute left-0 bottom-0 w-full text-red-500 text-xs text-center sm:text-left">{errors.email.message}</p>}
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
						<div className="w-full relative pb-5">
							<input
								type="text"
								placeholder="Product details type here..."
								{...register('details')}
								className="paragraph bg-transparent font-NeueMontreal font-normal text-secondry border-b border-black focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-end sm:justify-start xm:justify-start pt-[50px]">
				<div className="flex sm:flex-col xm:flex-col md:flex-col gap-[25px] mb-12">
					<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
						<ButtonContact bgcolor="#35292E" title="send inquiry" className="bg-white" type="submit" />
					</div>
				</div>
			</div>
		</form>
	);
};

export default Form;
