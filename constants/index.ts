import { gcp, nextjs, laravel, databases, react, thriftify, portfolio_v1, haskell, dasar_programming, dasar_aws, backend_pemula, jaringan_pemula, dasar_devops, dasar_ux, dasar_javascript, dasar_git, dasar_sql } from '@/public';
import { Facebook, Github, Globe, Instagram, Linkedin, Mail, MessageCircleMore, Newspaper } from 'lucide-react';

// Navbar
export const navbarItems = [
	{
		id: 1,
		title: 'About',
		href: '/about',
	},
	{
		id: 2,
		title: 'Projects',
		href: '/projects',
	},
	{
		id: 3,
		title: 'Certifications',
		href: '/certifications',
	},
	{
		id: 4,
		title: 'Rewinds',
		href: '/rewinds',
	},
	{
		id: 5,
		title: 'LinkTree',
		href: '/me',
	},
	{
		id: 6,
		title: 'Contact us',
		href: '/contact',
	},
];

// Footer
export const footerItems = [
	{
		id: 1,
		title: 'Github',
		url: 'https://github.com/muhananaufal/',
		imageSrc: '/social/github.png',
	},
	{
		id: 2,
		title: 'LinkedIn',
		url: 'https://www.linkedin.com/in/muhana-naufal/',
		imageSrc: '/social/linkedin.png',
	},
	{
		id: 3,
		title: 'Instagram',
		url: 'https://www.instagram.com/_muhananaufal_/',
		imageSrc: '/social/instagram.png',
	},
	{
		id: 4,
		title: 'Medium',
		url: 'https://medium.com/@muhananaufal/',
		imageSrc: '/social/medium.png',
	},
	{
		id: 5,
		title: 'Facebook',
		url: 'https://www.facebook.com/profile.php?id=100022179201787/',
		imageSrc: '/social/facebook.png',
	},
];

// Skills
export const skillsItems = [
	{
		id: 1,
		phase: '01. Frontend',
		name: 'React & Tailwind',
		src: react,
		review: 'Proficient in React for building dynamic, responsive, and interactive user interfaces using component-based architecture. Skilled in Tailwind CSS for creating modern, customizable designs with utility-first styling.',
		button: 'details',
	},
	{
		id: 2,
		phase: '02. PHP Framework',
		name: 'Laravel',
		src: laravel,
		review:
			"Experienced in Laravel, specializing in building robust, scalable web applications. Proficient in routing, Eloquent ORM, middleware, and API development for seamless backend functionality. Skilled in leveraging Laravel's features like Blade templating, queues, and authentication to deliver efficient and maintainable solutions.",
		button: 'details',
	},
	{
		id: 3,
		phase: '03. Javascript Framework',
		name: 'NextJS',
		src: nextjs,
		review:
			'Proficient in Next.js for building fast, scalable React applications with server-side rendering and static site generation. Experienced in using Next.js features like API routes, dynamic routing, and optimized image handling to create high-performance web apps. Skilled in integrating backend functionality with frontend, ensuring seamless full-stack development.',
		button: 'details',
	},
	{
		id: 4,
		phase: '04. Databases',
		name: 'MySQL, MongoDB, BaaS',
		src: databases,
		review:
			'Proficient in MySQL for designing and managing relational databases with complex queries and optimizations. Experienced in MongoDB for handling NoSQL data with flexible schemas and efficient querying. Familiar with Backend-as-a-Service (BaaS) platforms like Firebase and Supabase, leveraging cloud-based databases and services for rapid application development and scalability.',
		button: 'details',
	},
	{
		id: 5,
		phase: '05. Cloud Computing',
		name: 'GCP',
		src: gcp,
		review:
			'Familiar with cloud computing, particularly with Google Cloud Platform (GCP), utilizing services such as Compute Engine, Cloud Functions, and Firestore to deploy and manage scalable applications. While still gaining hands-on experience, I am passionate about cloud architecture and optimizing cloud resources for efficient and cost-effective solutions.',
		button: 'details',
	},
];

// Projects
export const projectsItem = [
	{
		id: 1,
		title: 'Thriftify',
		src: thriftify,
		href: 'https://github.com/muhananaufal/thriftify',
		links: [
			{
				id: 1,
				title: 'Laravel',
				href: 'https://laravel.com/',
			},
			{
				id: 2,
				title: 'Tailwind',
				href: 'https://tailwindcss.com/',
			},
		],
	},
	{
		id: 2,
		title: 'Portfolio-v1',
		src: portfolio_v1,
		href: 'https://muhananaufal-portfolio.vercel.app/',
		links: [
			{
				id: 1,
				title: 'NextJS',
				href: 'https://nextjs.org/',
			},
			{
				id: 2,
				title: 'ReactJS',
				href: 'https://react.dev/',
			},
			{
				id: 3,
				title: 'Tailwind',
				href: 'https://tailwindcss.com/',
			},
			{
				id: 4,
				title: 'Framer Motion',
				href: 'https://www.npmjs.com/package/framer-motion',
			},
		],
	},
];

// Certifications
export const certificationsItems = [
	{
		id: 1,
		title: 'Memulai Pemrograman dengan Haskell',
		src: haskell,
	},
	{
		id: 2,
		title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
		src: dasar_programming,
	},
	{
		id: 3,
		title: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)',
		src: dasar_aws,
	},
	{
		id: 4,
		title: 'Belajar Membuat Aplikasi Back-End untuk Pemula',
		src: backend_pemula,
	},
	{
		id: 5,
		title: 'Belajar Jaringan Komputer untuk Pemula',
		src: jaringan_pemula,
	},
	{
		id: 6,
		title: 'Belajar Dasar-Dasar DevOps',
		src: dasar_devops,
	},
	{
		id: 7,
		title: 'Belajar Dasar UX Design',
		src: dasar_ux,
	},
	{
		id: 8,
		title: 'Belajar Dasar Structured Query Language (SQL)',
		src: dasar_javascript,
	},
	{
		id: 9,
		title: 'Belajar Dasar Pemrograman JavaScript',
		src: dasar_git,
	},
	{
		id: 10,
		title: 'Belajar Dasar Git dengan GitHub',
		src: dasar_sql,
	},
];

// FAQ
export const FaqItems = [
	{
		id: 1,
		question: 'What technologies do you specialize in for web development?',
		title: 'Description',
		description:
			'We work with modern frameworks like React.js, Next.js, and Tailwind for frontend. For backend, we use Node.js or Laravel. Our database expertise spans SQL (PostgreSQL, MySQL) and NoSQL (MongoDB) or BaaS (Firebase, Supabase)',

		button: 'more',
	},
	{
		id: 2,
		question: 'Can you deploy applications to cloud platforms?',
		title: 'Description',
		description: 'Absolutely! We handle deployment on platforms like AWS, Google Cloud, and even serverless architectures like Vercel.',

		button: 'more',
	},
	{
		id: 3,
		question: 'Do you offer API development and integration services?',
		title: 'Description',
		description: 'Yes, we design and develop RESTful APIs, ensuring efficient data exchange. We also integrate third-party APIs for payment systems, social media, cloud services, and more.',

		button: 'more',
	},
	{
		id: 4,
		question: 'Can you migrate existing applications to the cloud?',
		title: 'Description',
		description: 'We specialize in cloud migrations, whether it’s rehosting, refactoring, or re-architecting your application for the cloud.',

		button: 'more',
	},
	{
		id: 5,
		question: 'How do you ensure scalability in your projects?',
		title: 'Description',
		description: 'We implement scalable architectures using microservices and containerization (e.g., Docker, Kubernetes).',

		button: 'more',
	},
	{
		id: 6,
		question: 'Do you provide performance optimization for web apps?',
		title: 'Description',
		description: 'Absolutely. We optimize load times, reduce server costs, and improve overall performance using techniques like caching, CDN integration, and database indexing.',

		button: 'more',
	},
	{
		id: 7,
		question: 'What’s your approach to testing and quality assurance?',
		title: 'Description',
		description: 'We use both automated and manual testing methods, including unit testing, integration testing, and load testing, to ensure your application performs flawlessly.',

		button: 'more',
	},
];

export const linksTree = [
	{
		name: 'Back to Website',
		url: 'https://muhananaufal.my.id/',
		icon: Globe,
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/muhana-naufal/',
		icon: Linkedin,
	},
	{
		name: 'GitHub',
		url: 'https://github.com/muhananaufal/',
		icon: Github,
	},
	{
		name: 'Medium',
		url: 'https://medium.com/@muhananaufal/',
		icon: Newspaper,
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/_muhananaufal_/',
		icon: Instagram,
	},
	{
		name: 'WhatsApp',
		url: 'https://wa.me/+6285799470985',
		icon: MessageCircleMore,
	},
	{
		name: 'Facebook',
		url: 'https://www.facebook.com/profile.php?id=100022179201787/',
		icon: Facebook,
	},
	{
		name: 'Gmail',
		url: 'https://mail.google.com/mail/?view=cm&to=muhananaufal8@gmail.com',
		icon: Mail,
	},
];
