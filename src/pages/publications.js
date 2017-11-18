import React, { Component } from "react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import PBM2017 from "../files/2017-PBM.pdf";
import Cabo2017 from "../files/2017-cabo.pdf";
import mTMZ2016 from "../files/2016-mTMZ.pdf";
import Interlab from "../files/2016-Interlab.pdf";
import B162016 from "../files/2016-B16.pdf";

export default class Publications extends Component {
	render() {
		return (
			<div>
				<Header />
				<section style={{ paddingBottom: "0" }}>
					<h2>Publications</h2>
					<h3>2017</h3>
					<ul>
						<li>
							<p>
								Ortiz, J., Carr, S.B., Pavan, M., McCarthy, L.,
								<strong> Timmons, J.J.</strong>, & Densmore, D.M.
								(2017).{" "}
								<strong>
									Automated Robotic Liquid Handling Assembly
									of Modular DNA Devices.
								</strong>{" "}
								Accepted to <i>JoVE</i>
							</p>
						</li>
						<li>
							<p>
								<strong>Timmons, J.J.</strong>, Lok, E., San,
								P., Bui, K., & Wong, E.T. (2017).{" "}
								<strong>
									End-to-End Workflow for Finite Element
									Analysis of Tumor Treating Fields in
									Glioblastomas.
								</strong>{" "}
								<i>Physics in Medicine & Biology.</i>{" "}
								<a
									target="_blank"
									rel="noopener"
									href={PBM2017}
								>
									[pdf]
								</a>
							</p>
						</li>
						<li>
							<p>
								Patnaik, A., Swanson, K.D., Csizmadia, E.,
								Solanki, A., Landon-Brace, N., Gehring, M.P.,
								Helenius, K., Olson, B.M., Pyzer, A.R., Wang,
								L.C., Elemento, O., Novak, J., Thornley, T.B.,
								Asara, J.M., Montaser, L.,{" "}
								<strong>Timmons, J.J.</strong>, Morgan, T.M.,
								Wang, Y., Levantini, E., Clohessy, J.G., Kelly,
								K., Pandolfi, P.P., Rosenblatt, J.M., Avigan,
								D.E., Ye, H., Karp, J.M., Signoretti, S., Balk,
								S.P. & Cantley, L.C. (2017).{" "}
								<strong>
									Cabozantinib eradicates advanced murine
									prostate cancer by activating anti-tumor
									innate immunity.
								</strong>{" "}
								<i>Cancer Discovery.</i>{" "}
								<a
									target="_blank"
									rel="noopener"
									href={Cabo2017}
								>
									[pdf]
								</a>
							</p>
						</li>
					</ul>
					<h3>2016</h3>
					<ul>
						<li>
							<p>
								Wong, E.T., <strong>Timmons, J.J.</strong>,
								Callahan, A., O’Loughlin, L., Giarusso, B., &
								Alsop, D.C. (2016).{" "}
								<strong>
									Phase 1 study of low-dose metronomic
									temozolomide for recurrent malignant
									gliomas.
								</strong>{" "}
								<i>BMC Cancer.</i>{" "}
								<a
									target="_blank"
									rel="noopener"
									href={mTMZ2016}
								>
									[pdf]
								</a>
							</p>
						</li>
						<li>
							<p>
								Beal, J., Haddock-Angelli, T., Gershater, M., de
								Mora, K., Lizarazo, M., Hollenhorst, J.,
								Rettberg, R., &{" "}
								<strong>
									iGEM Interlab Study Contributors
								</strong>. (2016).{" "}
								<strong>
									Reproducibility of Fluorescent Expression
									from Engineered Biological Constructs in{" "}
									<i>E. coli</i>.
								</strong>{" "}
								<i>PLOS ONE.</i>{" "}
								<a
									target="_blank"
									rel="noopener"
									href={Interlab}
								>
									[pdf]
								</a>
							</p>
						</li>
						<li>
							<p>
								<strong>Timmons, J.J.</strong>, Cohessy, S., &
								Wong, E.T. (2016).{" "}
								<strong>
									Injection of Syngeneic Murine Melanoma Cells
									to Determine Their Metastatic Potential in
									the Lungs.
								</strong>{" "}
								<i>JoVE.</i>{" "}
								<a
									target="_blank"
									rel="noopener"
									href={B162016}
								>
									[pdf]
								</a>
							</p>
						</li>
					</ul>
				</section>
				<section>
					<h2>Posters</h2>
					<ul>
						<li>
							<p>
								Timmons, J.J., San, P., Bui, K., Lok, E., &
								Wong, E.T. (2017).{" "}
								<strong>
									Semi-automated MRI Segmentation Workflow for
									Glioblastoma Treated by Tumor Treating
									Fields.
								</strong>{" "}
								American Neurological Association.
							</p>
						</li>
						<li>
							<p>
								San, P., Timmons, J.J., Lok, E., Swanson,
								K.D., & Wong, E.T. (2016).{" "}
								<strong>
									Analysis of Glioblastoma Physical
									Characteristics in Patients Benefiting from
									Tumor Treating Electric Fields Therapy.
								</strong>{" "}
								Society for Neuro-Oncology.
							</p>
						</li>
						<li>
							<p>
								Doerfert, S., Berdy, B., Wunschel, E., Sizova,
								M., Timmons, J.J., Jung, D., Kruppa, G., &
								Epstein, S. (2014).{" "}
								<strong>
									MALDI-TOF applications for dereplication and
									identification of environmental
									microorganisms isolated from Thule,
									Greenland.
								</strong>{" "}
								International Society for Microbial Ecology.
							</p>
						</li>
						<li>
							<p>
								Berdy, B., Sizova, M., Kaluziak, S., Doerfert,
								S., Wunschel, E., Timmons, J.J., Jung, D.,
								Torralba, M., Haft, D., Nelson, K., & Epstein,
								S. (2014).{" "}
								<strong>
									Towards predictable manipulation of
									microbial communities.
								</strong>{" "}
								International Society for Microbial Ecology.
							</p>
						</li>
					</ul>
				</section>
				<Footer
					resolutions={
						this.props.data.file.childImageSharp.resolutions
					}
				/>
			</div>
		);
	}
}

export const query = graphql`
	query PubFooterImage {
		file(relativePath: { eq: "components/face.png" }) {
			childImageSharp {
				resolutions(height: 205, width: 205) {
					...GatsbyImageSharpResolutions_noBase64
				}
			}
		}
	}
`;
