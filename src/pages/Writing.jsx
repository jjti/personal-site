import React from "react";

import { Header, Footer, SingleEntry as Article } from "../components";

const Writing = () => (
	<div className="Container">
		<Header />
		<section className="full">
			<h2>Northeastern COS</h2>
			<Article
				title="Automating Solutions to Side-Channel Attacks"
				date="July 21, 2016"
				blurb="Side-channel attacks are an emerging threat to embedded systems. As a result, mathematics professor Aidong (Adam) Ding and colleagues are creating a tool that automatically corrects for side-channel weaknesses."
				href="http://www.northeastern.edu/cos/2016/07/automating-solutions-to-side-channel-attacks/"
			/>
			<Article
				title="After more than 50 years, Dr. Karger is retiring, but he isn’t"
				date="May 11, 2016"
				blurb="Dr. Barry Karger has taught at Northeastern University for 53 years, and has spent 43 years as director of the Barnett Institute. But if you ask him about his retirement, he’ll tell you, “I’m not going to just go fishing.”"
				href="http://www.northeastern.edu/cos/2016/05/dr-karger-retiring/"
			/>
			<Article
				title="Slava Epstein: From immigrant painter to world-renowned biologist"
				date="January 20, 2016"
				blurb="When Slava Epstein first arrived in America, he had little more than his family, a smuggled cat, and an “enormous amount of data” from his research in Russia. In 2015, he was part of one of the world’s biggest scientific stories."
				href="http://www.northeastern.edu/cos/2016/01/slava-epstein-2/"
			/>
			<Article
				title="Chemistry Department Garners National Recognition"
				date="August 24, 2015"
				blurb="Northeastern’s chemistry department was recently ranked in the top 10 in a review of career support services among American chemistry departments."
				href="http://www.northeastern.edu/cos/2015/08/chemistry-top-10/"
			/>
			<Article
				title="Undergraduate research leads to NSF graduate research fellow award"
				date="June 23, 2015"
				blurb="One of this year’s NSF graduate research fellowship awardees is Sara Williams, a Research Technician at the Marine Science Center and an incoming graduate student in Northeastern’s Ecology, Evolution, and Marine Biology PhD program."
				href="http://www.northeastern.edu/cos/2015/06/sara-williams/"
			/>
			<Article
				title="Capturing and profiling rare cells"
				date="April 15, 2015"
				blurb="Northeastern University researchers have extensively profiled the proteins of rare cells in blood, a feat that was previously impossible. By successfully isolating and characterizing rare cells that make up just 0.001 percent or less of the total cells present in blood, faculty members have built a foundation for proteomics-based personalized medicine."
				href="http://www.northeastern.edu/cos/2015/04/capturing-and-profiling-rare-cells/"
			/>
		</section>
		<Footer />
	</div>
);

export default Writing;
