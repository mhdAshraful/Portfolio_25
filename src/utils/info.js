const Data = [
	{
		home: {
			title: "I bring life 🫀 to your Design & Occasionally Break for coffee ☕️",
		},
	},
	{
		about: {
			title1: "What i bring to the table?",
			ui: {
				title: "UI / Engineering",

				ribbontext: "Clean Responsive Sclable Interface",
				img1: "/assets/images/fullstar.svg",
				img2: "/assets/images/halfstar.svg",
				img3: "/assets/images/cornerstar.svg",
				mobile: "/assets/images/MobileInterface.png",
			},
			webgl: {
				title: "Immersive / Experiences",

				ribbontext: "Immersive Experience with WebGL, React three fiber ",
			},
			interaction: {
				title: "Interaction that Feels Alive",

				ribbontext: "Motion Scroll and smooth user flows",
			},
			focus: {
				title: "The measure of intelligence is the ability to change.",
				reference: "- Albert Einstein",
				img: "/assets/images/quote.svg",

				aday: {
					"5am": "Wake up & Stretch",
					"6am": "☀️ Morning Walk 🏃‍♂️",
					"8am": "Coffee 🍵  + Dev Planning",
					"9am": "🧑‍💻Deep Work (Coding)",
					"10am": "Continue",
					"1pm": "Lunch + Scroll Cooldown",
					"2pm": "Projects Break / Journaling",
					"5pm": "WebGL Exploration ✨",
					"7pm": "Light Reading or  🎮",
					"8pm": "Offline",
					"10pm": "Sleep Prep 💤",
				},
			},
			education: {
				title: "Education",

				maincourse: {
					c1: {
						year: "October 2019",
						provider: "Charles Darwin University",
						cert: "Bachelor Information Technology",
					},
					c2: {
						year: "March 2021",
						provider: "Navitas International",
						cert: "ACS Professional Year Program",
					},
					c3: {
						year: "April 2023",
						provider: "Shiekhbe Sobai",
						cert: "Fullstack Development (MERN)",
					},
				},
				othercourse: {
					c1: {
						provider: "Three.js-journey.com",
						cert: "Become a ThreeJS Developer -by Bruno Saimon",
					},
					c2: {
						provider: "Awwwards.com",
						cert: "Creative Portfolios: A powerful visual language for brands. -by Niccolò Miranda",
					},
					c3: {
						provider: "Awwwards.com",
						cert: "Creative Practices: from idea to final layout using Figma. -by Viacheslav Olianishyn",
					},
					c4: {
						provider: "Awwwards.com",
						cert: "Merging WebGL and HTML worlds. -by Yuri Artiukh",
					},
					c5: {
						provider: "Awwwards.com",
						cert: "Using motion design to animate with purpose and create delightful experiences. -by Louis Paquet",
					},
				},
				Books: {
					b1: "THE HOLY QURAN",
					b2: "The Design of Everyday things -Don Norman",
					b3: "The Nature of code -Denial ShiffMan",
				},
			},
		},
	},
	{
		myworks: {
			title: "When Design Talks, Fonts Just Follow - Explore My Work",

			works: [
				{
					type: "E-commerce",
					link: "https://audiophile-green-alpha.vercel.app/",
					worktype: "ecommerce",
				},
				{
					type: "Art Gallery",
					link: "https://modern-artgallary.vercel.app/",
					worktype: "artgallery",
				},
				{
					type: "Portfolio",
					link: "https://ashiqulislam.vercel.app/",
					worktype: "portfolio",
				},
				{
					type: "Immersive UX",
					link: "./",
					worktype: "webgl",
				},
			],

			ecommerce: {
				title: "Crafted E-commerce Website",

				link: "https://audiophile-green-alpha.vercel.app/",
				image1: "/assets/images/audiophile.png",
				video: "/assets/videos/audiophile_.webm",
			},
			artgallery: {
				title: "Crafted Art Gallery Website",

				link: "https://modern-artgallary.vercel.app/",
				image1: "/assets/images/artgallery.png",
				video: "/assets/videos/art_.webm",
			},
			portfolio: {
				title: "Crafted Portfolio Website",
				altLink: "https://prtflo-ashql.vercel.app/",
				link: "https://www.ashiqul.net",
				image1: "/assets/images/ashiq.png",
				video: "/assets/videos/ashiq_.webm",
			},
			webgl: {
				title: "WebGL Playground",

				link: "https://www.ashiqul.net",
				image1: "/assets/images/audiophile.png",
				video: "/assets/videos/webgl_.webm",
			},
		},
	},
	{
		contact: {
			title: "Don\u2019t hesitate ||| to reach out!",
			subtitle:
				"Ignore the time difference,||| I would love ❤️ to hear about ||| your project anytime 😊.",
			email: "hey@mhdashraful.com",
			phone: "+8801327343156",
			location: "Dhaka,||| Bangladesh",
			res1: "You're more likely to get response",
			res2: "by 09:30am - 2:00pm||| Open to projects across||| the horizon from",
			flowerImg: "/assets/images/flowerbucket.png",
			letsImg: "/assets/images/letsmake.svg",
		},
	},
	{
		sociallinks: {
			github: "https://github.com/mhdAshraful",
			gitImg: "/assets/images/boxGithub.svg",
			linkedin: "https://linkedin.com/in/mhdashraful",
			linkdImg: "/assets/images/boxLinkedin.svg",
			twitter: "https://x.com/mhdashraful/",
			twitImg: "/assets/images/boxTwitter.svg",
		},
	},
	{
		experiences: [
			// Recent client work (update dates as needed)
			{
				title: "Frontend Engineer (Client Project)",
				type: "Freelance / Contract",
				org: "AS Enterprize",
				location: "Remote",
				duration: {
					start: "JAN 2026",
					end: "Present",
				},
				role: "Built AES Enterprize e-commerce storefront using Next.js 15 (App Router) and TypeScript. Owned UI architecture, responsive catalog experiences, and checkout/payment integration.",
				achievements: [
					"Implemented product catalog with responsive product grid, reusable UI components, and animated interactions",
					"Built client-side cart with persistent storage, plus checkout dialog and cart drawer UX",
					"Integrated server-side SSLCommerz payment flows (init/success/fail/cancel) and wired end-to-end checkout states",
					"Maintained clean, scalable component architecture using shadcn/ui primitives",
				],
				tools: [
					"/assets/images/NextJS.svg",
					"/assets/images/React.svg",
					"/assets/images/VS Code.svg",
				],
				skills: [
					"Next.js (App Router)",
					"TypeScript",
					"E-commerce UX",
					"Payment Integration (SSLCommerz)",
					"Component Architecture",
					"Responsive UI",
				],
			},
			{
				title: "Full-Stack Web Developer (Frontend Focused)",
				type: "Freelance",
				org: "Self-employed",
				location: "",
				duration: {
					start: "Mar 2023",
					end: "Present",
				},
				role: "Built custom websites and revamped existing platforms with a focus on responsive design, accessibility, and scalable architecture. Worked closely with designers and clients to align functionality with user experience.",
				achievements: [
					"Transformed static designs into dynamic, mobile-friendly web interfaces using React and modern CSS",
					"Collaborated with UX designers to iterate on user flows and design implementation",
					"Communicated directly with clients to gather requirements, set expectations, and deliver progress updates",
					"Implemented React Context API to manage global state and simplify component communication",
					"Optimized SEO through structured data, clean markup, and performance enhancements",
				],
				tools: [
					"/assets/images/React.svg",
					"/assets/images/VS Code.svg",
					"/assets/images/JavaScript.svg",
					"/assets/images/HTML.svg",
					"/assets/images/SCSS.svg",
					"/assets/images/Figma.svg",
					"/assets/images/WebGL.svg",
					"/assets/images/ThreeJS.svg",
					"/assets/images/NextJS.svg",
				],
				skills: [
					"Client Communication",
					"UX Collaboration",
					"Responsive Design",
					"SEO",
					"Frontend Architecture",
				],
			},
			{
				title: "Intern Web Developer",
				type: "Internship",
				org: "Charles Darwin University",
				location: "Darwin, NT Australia",
				duration: {
					start: "Nov 2020",
					end: "Apr 2021",
				},
				role: "Contributed to several end-to-end web development projects during a comprehensive internship. Gained exposure to user research, design systems, testing, and deployment within a collaborative team environment.",
				achievements: [
					"Interviewed users and stakeholders to gather business requirements and translated them into personas and workflows",
					"Created wireframes, UI mockups, and prototypes for developer handoff",
					"Assisted in testing web apps with end-users and integrated feedback into iterative design improvements",
					"Participated in project meetings, presented design concepts, and addressed client feedback",
					"Documented development processes and ensured compliance with WHS policies and procedures",
				],
				tools: [
					"/assets/images/HTML.svg",
					"/assets/images/CSS.svg",
					"/assets/images/JavaScript.svg",
					"/assets/images/Persona.svg",
					"/assets/images/Figma.svg",
				],
				skills: [
					"Creating User Personas",
					"UX Research",
					"Wireframing",
					"Prototyping",
					"Documentation",
					"Client Presentation",
					"Team Collaboration",
				],
			},
			{
				title: "ICT Field Support Eng.",
				type: "Casual",
				org: "Best Technology Services",
				location: "Darwin, NT Australia",
				duration: {
					start: "Apr 2017",
					end: "Jun 2021",
				},
				role: "Provided on-site technical support and network setup for businesses, addressing a wide range of hardware and software issues with professionalism and precision.",
				achievements: [
					"Diagnosed and resolved IT issues across hardware, software, and networking environments",
					"Installed and configured operating systems, peripherals, and network equipment",
					"Maintained accurate documentation of support tickets, inventory, and resolutions",
					"Performed preventive maintenance and safety checks during field visits",
					"Assisted clients with technical inquiries and provided training for basic system use",
				],
				tools: [
					"/assets/images/Windows.svg",
					"/assets/images/Network.svg",
					"/assets/images/Printers.svg",
					"/assets/images/Switches.svg",
					"/assets/images/Modems.svg",
				],
				skills: [
					"Troubleshooting",
					"Network Setup",
					"Client Support",
					"Documentation",
					"Field Safety",
				],
			},
			{
				title: "Desktop Assembler",
				type: "Contract",
				org: "PC-Mart Darwin",
				location: "Woolner, NT Australia",
				duration: {
					start: "Feb 2018",
					end: "Jun 2018",
				},
				role: "Built custom PC systems and supported day-to-day retail operations in a fast-paced IT hardware store.",
				achievements: [
					"Assembled desktop computers according to customer specifications",
					"Managed incoming stock, handled dispatches, and updated inventory records",
					"Provided technical advice and support to walk-in and phone customers",
					"Processed transactions and orders while maintaining a high level of customer service",
				],
				tools: [
					"/assets/images/Windows.svg",
					"/assets/images/Graphics.svg",
					"/assets/images/Fan.svg",
					"/assets/images/Cpu.svg",
					"/assets/images/Ram.svg",
				],
				skills: [
					"Hardware Assembly",
					"Customer Support",
					"Inventory Management",
				],
			},
			{
				title: "Team Member",
				type: "Part-time",
				org: "Woolworths",
				location: "Coolalinga, NT Australia",
				duration: {
					start: "May 2020",
					end: "Jul 2022",
				},
				role: "Providing service and operational support in a customer-facing retail environment. Played a key role in maintaining inventory flow and product quality.",
				achievements: [
					"Assisted customers with product inquiries and checkout experiences",
					"Monitored and restocked inventory to ensure product availability",
					"Checked and maintained quality standards for fresh produce",
					"Handled deliveries and organized back-of-house stock areas",
				],
				tools: ["POS Systems", "Inventory Tools"],
				skills: [
					"Customer Service",
					"Inventory Management",
					"Teamwork",
					"Time Management",
				],
			},
		],
	},
];
export default Data;
