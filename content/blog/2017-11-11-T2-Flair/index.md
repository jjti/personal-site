---
title: T2 Flair Quantification for Glioblastoma
date: 11/11/2017
---
Over the last couple weeks, I've been trying to find an efficient way to automatically quantify the volume and intensity of T2 flair in the MRI scans of patients with Glioblastoma multiforme.

### MRI Overview

An MRI is a visual representation of [induced changes in the magnetization of the body's water protons](http://casemed.case.edu/clerkships/neurology/Web%20Neurorad/MRI%20Basics.htm). In an MRI, protons are aligned with a large, external magnetic field (one 50,000 times stronger than the Earth's magnetic field). This induced alignment is either parallel (majority) or antiparallel (minority) to the magnetic field. Parallel alignment to the field, in the same direction as the magnetic vector, is called [longitudinal magnetization](https://www.youtube.com/watch?v=Ok9ILIYzmaY). In parallel or antiparallel alignment with the magnetic vector, the protons [precess](https://en.wikipedia.org/wiki/Precession) around the magnetic vector in phase with on another, like synchronized spinning tops. The rate of the protons' precession around the magnetic vector is proportional to the strength of the applied magnetic field.

![Procession](http://sites.duke.edu/apep/files/2016/02/mri-procession.jpg)

These aligned protons are then hit with RF pulses (at the same frequency as the precession rate) to knock some of them out into antiparallel alignment, decreasing the longitudinal magnetization. The aligned protons, both parallel and antiparallel, then begin to precess in phase again, in sync, but with fewer protons in parallel alignment with the magnetic field. Because the net magnetic vectors of the protons is now split between parallel and antiparallel directionality, and the protons are precessing in sync with one another, the net magnetic alignment vector spins perpendicular to the MRI's magnetic vector in [transverse magnetization](http://mrishark.com/te.html).

This is a higher energy state for the protons. When the RF pulses stop, the protons will fall back into parallel alignment with the MRIs magnetic field, [relaxing](https://en.wikipedia.org/wiki/Physics_of_magnetic_resonance_imaging#Resonance_and_relaxation). This relaxation is accompanied by a release of energy measured as an RF signal. The return of longitudinal magnetization, as the protons realign with the magnetic field, is measured as [T1](https://en.wikipedia.org/wiki/Physics_of_magnetic_resonance_imaging#Resonance_and_relaxation).

![T1 Relaxation Curve](https://upload.wikimedia.org/wikipedia/commons/f/f2/T1_relaxation.jpg)

T2, on the other hand, corresponds to the rate at which protons in the targeted plane go out of phase with one another. While the protons had been precessing in phase during the application of an RF pulse, they fall back into a random distribution without the resonance of the RF pulses, and this decay of "sync-ness" in the transverse plane is [T2](https://en.wikipedia.org/wiki/Physics_of_magnetic_resonance_imaging#Resonance_and_relaxation). MRI is useful for differentiating tissues because the rate of T1 and T2 relaxation [differs across type types](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1121941/).

![T2 Relaxation Curve](https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/T2_relaxation.svg/391px-T2_relaxation.svg.png)

### Flair

Besides the difference between T1 and T2, MRI imaging is distinguishable by the [repetition time (TR)](http://casemed.case.edu/clerkships/neurology/Web%20Neurorad/MRI%20Basics.htm) between of RF pulse application and the time of measurement of emitted RF waves relative to the application of the RF pulse, [time to echo (TE)](http://casemed.case.edu/clerkships/neurology/Web%20Neurorad/MRI%20Basics.htm). T2-weighted images generally have longer TR and TE times than T1-weighted, though FLAIR has the longest TR and TE of all. Furthermore, in order to avoid having a high signal from CSF, as is standard with weighted-T2, the pulsed RF is applied with an inversion time that [prevents transverse magnetization of fluid](https://radiopaedia.org/articles/fluid-attenuation-inversion-recovery), thereby preventing its readout in the T2 MRI.