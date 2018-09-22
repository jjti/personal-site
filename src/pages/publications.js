import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import B162016 from "../files/2016-B16.pdf";
import Interlab from "../files/2016-Interlab.pdf";
import mTMZ2016 from "../files/2016-mTMZ.pdf";
import Cabo2017 from "../files/2017-cabo.pdf";
import JoVE2017 from "../files/2017-JoVE.pdf";
import PBM2017 from "../files/2017-PBM.pdf";
import AJCO2018 from "../files/2018-AJCO.pdf";
import PLOS2018 from "../files/2018-PLOS.pdf";

/** ego-highlight: wrap my name in bold spans */
const egoHighlight = authors => {
  const name = "Timmons, J.J.";
  const nameIndex = authors.indexOf(name);

  if (nameIndex > -1) {
    const first = authors.substring(0, nameIndex);
    const second = authors.substring(nameIndex + name.length);

    return (
      <>
        {first}
        <strong>{name}</strong>
        {second}
      </>
    );
  }
  return authors;
};

/** Publication is a single publication entry with authors, link, etc */
const Publication = props => (
  <li>
    <p>
      {egoHighlight(props.authors)} {props.title} <i>{props.journal}</i>{" "}
      {props.href && (
        <a target="_blank" rel="noopener" href={props.href}>
          [pdf]
        </a>
      )}
    </p>
  </li>
);

Publication.propTypes = {
  authors: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  journal: PropTypes.string.isRequired,
  href: PropTypes.string
};

const Year = props => (
  <div>
    <h6>{props.year}</h6>
    <ul className="plain-list">{props.children}</ul>
  </div>
);

Year.propTypes = {
  year: PropTypes.string.isRequired
};

/**
 * an object that holds all the publication info. It's easier to look at/define this
 * in a single object than to be explicit in the render
 */
const publications = {
  2018: [
    {
      authors: "Timmons, J.J., Preto, J., Tuszynski, J.A., & Wong, E.T.",
      title:
        "Tubulin's response to external electric fields by molecular dynamics simulations.",
      journal: "PLOS One.",
      href: PLOS2018
    },
    {
      authors:
        "Timmons, J.J., Zhang, K., Fong, J., Lok, E., Swanson, K.D., Gautam, S., & Wong, E.T.",
      title: "Literature Review of Spinal Cord Glioblastoma.",
      journal: "American Journal of Clinical Oncology.",
      href: AJCO2018
    }
  ],
  2017: [
    {
      authors:
        "Ortiz, J., Carr, S.B., Pavan, M., McCarthy, L., Timmons, J.J., & Densmore, D.M.",
      title:
        "Automated Robotic Liquid Handling Assembly of Modular DNA Devices.",
      journal: "Journal of Visualized Experiments.",
      href: JoVE2017
    },
    {
      authors: "Timmons, J.J., Lok, E., San, P., Bui, K., & Wong, E.T.",
      title:
        "End-to-End Workflow for Finite Element Analysis of Tumor Treating Fields in Glioblastomas.",
      journal: "Physics in Medicine & Biology.",
      href: PBM2017
    },
    {
      authors:
        "Patnaik, A., Swanson, K.D., Csizmadia, E., Solanki, A., Landon-Brace, N., Gehring, M.P., Helenius, K., Olson, B.M., Pyzer, A.R., Wang, L.C., Elemento, O., Novak, J., Thornley, T.B., Asara. J.M., Montaser, L., Timmons, J.J., Morgan, T.M., Wang, Y., Levantini, E., Clohessy, J.G., Kelly, K., Pandolfi, P.P., Rosenblatt, J.M., Avigan, D.E., Ye, H., Karp, J.M., Signoretti, S., Balk, S.P. & Cantley, L.C.",
      title:
        "Cabozantinib eradicates advanced murine prostate cancer by activating anti-tumor innate immunity.",
      journal: "Cancer Discovery.",
      href: Cabo2017
    }
  ],
  2016: [
    {
      authors:
        "Wong, E.T., Timmons, J.J., Callahan, A., O’Loughlin, L., Giarusso, B., & Alsop, D.C.",
      title:
        "Phase 1 study of low-dose metronomic temozolomide for recurrent malignant gliomas.",
      journal: "BMC Cancer.",
      href: mTMZ2016
    },
    {
      authors:
        "Beal, J., Haddock-Angelli, T., Gershater, M., de Mora, K., Lizarazo, M., Hollenhorst, J., Rettberg, R., & iGEM Interlab Study Contributors.",
      title:
        "Reproducibility of Fluorescent Expression from Engineered Biological Constructs in E. coli.",
      journal: "PLOS ONE.",
      href: Interlab
    },
    {
      authors: "Timmons, J.J., Cohessy, S., & Wong, E.T.",
      title:
        "Injection of Syngeneic Murine Melanoma Cells to Determine Their Metastatic Potential in the Lungs.",
      journal: "Journal of Visualized Experiments.",
      href: B162016
    }
  ]
};

/**
 * same as publications but holds posters and doesn't include an href
 * also the year is in the authors list
 */
const posters = [
  {
    authors: "Timmons, J.J., San, P., Bui, K., Lok, E., & Wong, E.T. (2017).",
    title:
      "Semi-automated MRI Segmentation Workflow for Glioblastoma Treated by Tumor Treating Fields.",
    journal: "American Neurological Association."
  },
  {
    authors:
      "San, P., Timmons, J.J., Lok, E., Swanson, K.D., & Wong, E.T. (2016).",
    title:
      "Analysis of Glioblastoma Physical Characteristics in Patients Benefiting from Tumor Treating Electric Fields Therapy.",
    journal: "Society for Neuro-Oncology."
  },
  {
    authors:
      "Doerfert, S., Berdy, B., Wunschel, E., Sizova, M., Timmons, J.J., Jung, D., Kruppa, G., & Epstein, S. (2014).",
    title:
      "MALDI-TOF applications for dereplication and identification of environmental microorganisms isolated from Thule, Greenland.",
    journal: "International Society for Microbial Ecology."
  },
  {
    authors:
      " Berdy, B., Sizova, M., Kaluziak, S., Doerfert, S., Wunschel, E., Timmons, J.J., Jung, D., Torralba, M., Haft, D., Nelson, K., & Epstein, S. (2014).",
    title: "Towards predictable manipulation of microbial communities.",
    journal: "International Society for Microbial Ecology."
  }
];

export default props => (
  <div>
    <Header />
    <section style={{ paddingBottom: "0" }}>
      <h1>Publications</h1>
      {Object.keys(publications)
        .sort((a, b) => b - a)
        .map(year => (
          <Year key={year} year={year}>
            {publications[year].map(p => (
              <Publication key={p.title} {...p} />
            ))}
          </Year>
        ))}
    </section>
    <section>
      <h1>Posters</h1>
      <ul className="plain-list">
        {posters.map(p => (
          <Publication key={p.title} {...p} />
        ))}
      </ul>
    </section>
    <Footer resolutions={props.data.file.childImageSharp.resolutions} />
  </div>
);

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
