import React, { forwardRef, useEffect, useState } from 'react'
import Data from '../utils/info'
import Cornerinfo from './Cornerinfo'

const Contact = forwardRef((props, ref) => {
	const { title, subtitle, res1, res2, phone, location } = Data[3].contact
	const { twitter, linkedin, github, gitImg, twitImg, linkdImg } =
		Data[4].sociallinks
	const ttl = title.split('|||')

	const part1 = subtitle.split('|||')
	const part2 = res2.split('|||')
	const loc = location.split('|||')

	const [clientFormatedTime, setClientTime] = useState()
	const [mydate, setmyDate] = useState('')
	const [myYear, setmyDYear] = useState(0)

	useEffect(() => {
		const updatTime = () => {
			let ftCt = new Intl.DateTimeFormat(undefined, {
				hour: 'numeric',
				minute: 'numeric',
			}).format(new Date())
			setClientTime(ftCt)

			let mydate = new Date()
			let d1 = new Intl.DateTimeFormat('en-US', {
				timeZone: 'Asia/Dhaka',
				day: 'numeric',
				month: 'short',
				weekday: 'long',
				year: 'numeric',
			}).formatToParts(mydate)

			// Extract parts
			const day = d1.find((p) => p.type === 'day')?.value
			const month = d1.find((p) => p.type === 'month')?.value
			const weekday = d1.find((p) => p.type === 'weekday')?.value
			const year = d1.find((p) => p.type === 'year')?.value

			setmyDate(`${day} ${month}, ${weekday}`)
			setmyDYear(year)
		}

		const interID = setInterval(() => updatTime(), 1000)

		return () => clearInterval(interID)
	}, [])

	return (
		<section
			ref={ref}
			data-section="contact"
			className="contact_wrapper snapper"
		>
			<div className="contact">
				<h1 className="title">
					{ttl[0]} <br />
					{ttl[1]}
				</h1>
				{/* Middle Part */}
				<div className="middle_content">
					<div className="client_time">
						<p className="heading">Your time: {clientFormatedTime}</p>
						<p className="desc">
							{part1[0]} <br />
							{part1[1]} <br />
							{part1[2]}
						</p>
					</div>
					<div className="time_freme">
						<div className="loca_time">
							<p>{mydate}</p>
							<Cornerinfo
								topLine=" "
								description=" "
								clientTime={true}
							/>
						</div>
						<div className="year">{myYear}</div>
					</div>
					<div className="email_me">
						<p className="heading">Email</p>
						<a href="mailto:hey@mhdashraful.com?subject=We%20May%20Have%20an%20Opportunity!">
							<p className="email highilighted">
								hey@ <br />
								mhdAshraful.com
							</p>
						</a>
					</div>
				</div>

				{/* Ending Part */}
				<div className="ending_part">
					<div className="res_loc">
						<div className="response">
							<p className="heading">{res1}</p>
							<p className="desc">
								{part2[0]} <br />
								{part2[1]} <br />
								{part2[2]}
							</p>
						</div>
						<div className="location">
							<p className="heading">Location</p>
							<p className="city">
								{loc[0]} <br />
								{loc[1]}
							</p>
						</div>
					</div>
					<div className="phn_icon">
						<div className="phone_me">
							<p className="heading">Phone</p>
							<p className="phone highilighted">{phone}</p>
						</div>
						<div className="socail_icon">
							<a
								href={linkedin}
								className="urls"
								rel="noopener noreferrer"
							>
								<img src={linkdImg} alt="linkedin icon" />
							</a>
							<a
								href={twitter}
								className="urls"
								rel="noopener noreferrer"
							>
								<img src={twitImg} alt="twitter icon" />
							</a>
							<a
								href={github}
								className="urls"
								rel="noopener noreferrer"
							>
								<img src={gitImg} alt="github icon" />
							</a>
						</div>
					</div>
				</div>
				<div className="spinner">
					<SpinnedFlower
						flowerURL="/assets/images/flowerbucket.png"
						textMaskUrl="/assets/images/letsmake.svg"
					/>
				</div>
			</div>
		</section>
	)
})

export default Contact

export const SpinnedFlower = ({ flowerURL, textMaskUrl }) => {
	return (
		<div className="flower_box">
			<div className="flowers">
				<img id="flower" src={flowerURL} alt="some painted flower" />
			</div>
			<div className="lets_make spin360">
				<img
					id="spinner_text"
					src={textMaskUrl}
					alt="let's make something awesome "
				/>
			</div>
		</div>
	)
}
