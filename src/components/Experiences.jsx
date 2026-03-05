import React, { forwardRef, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Data from "../utils/info";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Experience Card Component */
const ExperienceCard = ({
	index,
	title,
	type,
	org,
	location,
	duration,
	role,
	link,
	achievements,
	skills,
}) => {
	return (
		<div className="experience_card" data-index={index}>
			<div className="card_inner">
				<header className="card_header">
					<span className="card_index">0{index + 1}</span>
					<div className="card_meta">
						<span className="card_type">{type}</span>
						<span className="card_duration">
							{duration.start} — {duration.end}
						</span>
					</div>
				</header>

				<div className="card_body">
					<h2 className="card_title">{title}</h2>
					<p className="card_org">
						{link ? (
							<a href={link} target="_blank" rel="noopener noreferrer">
								{org}
							</a>
						) : (
							org
						)}
						{location && ` · ${location}`}
					</p>
					<p className="card_role">{role}</p>

					<ul className="card_achievements">
						{achievements.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>

				<footer className="card_footer">
					<div className="card_skills">
						{skills.map((skill, i) => (
							<span key={i} className="skill_tag">
								{skill}
							</span>
						))}
					</div>
				</footer>
			</div>
		</div>
	);
};

/** Main Experiences Section */
const Experiences = forwardRef((props, ref) => {
	const wrapperRef = useRef();
	const { experiences } = Data[5];

	useGSAP(
		() => {
			const cards = gsap.utils.toArray(".experience_card");
			const totalCards = cards.length;

			// Set initial state: all cards stacked, only first visible
			gsap.set(cards, {
				yPercent: 100,
				opacity: 0,
				scale: 0.92,
			});
			gsap.set(cards[0], {
				yPercent: 0,
				opacity: 1,
				scale: 1,
			});

			// Create main timeline
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: wrapperRef.current,
					start: "top top",
					end: `+=${totalCards * 90}%`,
					pin: true,
					scrub: 0.4,
					anticipatePin: 1,
					// markers: true, // for debugging
				},
			});

			// Animate each card in sequence
			cards.forEach((card, i) => {
				if (i === 0) return; // First card already visible

				const j = i - 1; // index of the card being pushed to the stack

				// Push card j to its final predetermined stacked position:
				// y:     -((totalCards - j) + 5)px  → card 0 = -(n+5)px, card 1 = -(n-1+5)px ...
				// scale: 1 - (totalCards - j) * 0.05 → deeper card = smaller
				tl.to(
					cards[j],
					{
						yPercent: -10, // clear any entering yPercent
						y: -(totalCards - j) * 5,
						// scale: 1 - (totalCards - j) * 0.01,
						opacity: 1,
						duration: 1,
						ease: "power2.inOut",
					},
					i,
				);

				// Current card enters from bottom
				tl.to(
					card,
					{
						yPercent: 0,
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 1,
						ease: "power2.inOut",
					},
					i,
				);
			});

			// Final card stays visible a bit longer
			// tl.to({}, { duration: 0.5 });
		},
		{ scope: wrapperRef },
	);

	// Merge forwarded ref with local ref
	const setRefs = (node) => {
		wrapperRef.current = node;
		if (typeof ref === "function") {
			ref(node);
		} else if (ref) {
			ref.current = node;
		}
	};

	return (
		<div ref={setRefs} data-section="experiences" className="exp_wrapper">
			<div className="experiences">
				<h1 className="title">Experiences</h1>
			</div>
			<div className="exp_stack">
				{experiences.map((exp, i) => (
					<ExperienceCard key={i} index={i} {...exp} />
				))}
			</div>
		</div>
	);
});

export default Experiences;
