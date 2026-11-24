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
  organisationName: "CoDSAI: Center of Data Science & Artificial Intelligence",
  organisationLine1: "CoDSAI",
  organisationLine2: "Center of Data Science & Artificial Intelligence",
  programmeTitle: "Python, Data Science & Machine Learning Workshop Series",
  shortDescription: "An end-to-end interactive learning platform supporting students from foundational programming to real-world machine learning application development.",
  logo: {
    primaryPath: "/logo/codsai-logo.png",
    fallbackPath: "/branding/codsai-logo.png",
    altText: "CoDSAI - Center of Data Science & Artificial Intelligence",
    width: 175,
    height: 38,
  },
  meta: {
    siteTitle: "CoDSAI | Center of Data Science & Artificial Intelligence",
    siteDescription: "Official Interactive Learning Platform for the Workshop Series conducted by CoDSAI: Center of Data Science & Artificial Intelligence.",
  },
} as const;
