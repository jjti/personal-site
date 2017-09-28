import React, { Component } from "react";
import { Header, Footer } from "./components";
import "./App.css";

import Cabo2017 from "./papers/2017_cabo.pdf";
import mTMZ2016 from "./papers/2016_mTMZ.pdf";
import Interlab from "./papers/2016_Interlab.PDF";
import B162016 from "./papers/2016_B16.pdf";

export default class Publications extends Component {
	render() {
		return (
			<div className="Container">
				<Header />
				<section className="full">
					<h2>Publications</h2>
					<h4>2017</h4>
					<ul>
						<li>
							Patnaik, A., Swanson, K.D., Csizmadia, E., Solanki,
							A., Landon-Brace, N., Gehring, M.P., Helenius, K.,
							Olson, B.M., Pyzer, A.R., Wang, L.C., Elemento, O.,
							Novak, J., Thornley, T.B., Asara, J.M., Montaser,
							L., <strong>Timmons, J.J.</strong>, Morgan, T.M.,
							Wang, Y., Levantini, E., Clohessy, J.G., Kelly, K.,
							Pandolfi, P.P., Rosenblatt, J.M., Avigan, D.E., Ye,
							H., Karp, J.M., Signoretti, S., Balk, S.P. &
							Cantley, L.C.{" "}
							<strong>
								Cabozantinib eradicates advanced murine prostate
								cancer by activating anti-tumor innate immunity.
							</strong>{" "}
							(2017). <i>Cancer Discovery.</i>{" "}
							<a target="_blank" href={Cabo2017}>
								[pdf]
							</a>
						</li>
					</ul>
					<h4>2016</h4>
					<ul>
						<li>
							Wong, E.T., <strong>Timmons, J.J.</strong>,
							Callahan, A., O’Loughlin, L., Giarusso, B., & Alsop,
							D.C. (2016).{" "}
							<strong>
								Phase 1 study of low-dose metronomic
								temozolomide for recurrent malignant gliomas.
							</strong>{" "}
							<i>BMC Cancer.</i>{" "}
							<a target="_blank" href={mTMZ2016}>
								[pdf]
							</a>
						</li>
						<li>
							Beal, J., Haddock-Angelli, T., Gershater, M., de
							Mora, K., Lizarazo, M., Hollenhorst, J., Rettberg,
							R., &{" "}
							<strong>iGEM Interlab Study Contributors</strong>.
							(2016).{" "}
							<strong>
								Reproducibility of Fluorescent Expression from
								Engineered Biological Constructs in{" "}
								<i>E. coli</i>.
							</strong>{" "}
							<i>PLOS ONE.</i>{" "}
							<a target="_blank" href={Interlab}>
								[pdf]
							</a>
						</li>
						<li>
							<strong>Timmons, J.J.</strong>, Cohessy, S., & Wong,
							E.T. (2016).{" "}
							<strong>
								Injection of Syngeneic Murine Melanoma Cells to
								Determine Their Metastatic Potential in the
								Lungs.
							</strong>{" "}
							<i>JoVE.</i>{" "}
							<a target="_blank" href={B162016}>
								[pdf]
							</a>
						</li>
					</ul>
				</section>
				<Footer />
			</div>
		);
	}
}
