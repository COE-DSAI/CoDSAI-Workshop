/**
 * CENTRAL BRANDING CONFIGURATION
 * 
 * Official Identity:
 * CENTER OF EXCELLENCE
 * DATA SCIENCE & ARTIFICIAL INTELLIGENCE
 * 
 * Programme:
 * Python, Data Science & Machine Learning Workshop Series
 */

export interface BrandingConfig {
  readonly organisationName: string;
  readonly organisationLine1: string;
  readonly organisationLine2: string;
  readonly programmeTitle: string;
  readonly shortDescription: string;
  readonly logo: {
    readonly primaryPath: string;
    readonly fallbackPath: string;
    readonly altText: string;
    readonly width: number;
    readonly height: number;
  };
  readonly meta: {
    readonly siteTitle: string;
    readonly siteDescription: string;
  };
}

export const BRANDING: BrandingConfig = {
  organisationName: "CENTER OF EXCELLENCE: DATA SCIENCE & ARTIFICIAL INTELLIGENCE",
  organisationLine1: "CENTER OF EXCELLENCE",
  organisationLine2: "DATA SCIENCE & ARTIFICIAL INTELLIGENCE",
  programmeTitle: "Python, Data Science & Machine Learning Workshop Series",
  shortDescription: "An end-to-end interactive learning platform supporting students from foundational programming to real-world machine learning application development.",
  logo: {
    primaryPath: "/branding/center-of-excellence-logo.png",
    fallbackPath: "/branding/center-of-excellence-logo.jpg",
    altText: "Center of Excellence - Data Science & Artificial Intelligence Logo",
    width: 220,
    height: 52,
  },
  meta: {
    siteTitle: "Center of Excellence | Data Science & Artificial Intelligence",
    siteDescription: "Official Interactive Learning Platform for the Python, Data Science & Machine Learning Workshop Series conducted by the Center of Excellence: Data Science & Artificial Intelligence.",
  },
} as const;
