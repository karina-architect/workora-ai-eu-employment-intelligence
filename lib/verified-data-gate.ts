import modules from "@/data/eu-country-modules.json";
import legal from "@/data/legal-disclaimer.json";

export type AdvisorInput = {
  question: string;
  persona: string;
  fromCountry: string;
  toCountry: string;
  language: string;
  goal?: string;
  grossMonthly?: number;
};

export function legalDisclaimer() {
  return legal.full;
}

export function countryModule(country: string) {
  return (modules as any[]).find(m => m.country === country) || null;
}

export function isVerified(country: string) {
  const m = countryModule(country);
  return Boolean(
    m?.verified &&
    m?.status === "verified" &&
    m?.reviewedBy &&
    m?.reviewedAt &&
    Array.isArray(m?.sourceLinks) &&
    m.sourceLinks.length > 0
  );
}

export function exactDataBlockedMessage(country: string) {
  return `${country}: exact legal/tax/social-security values are not displayed because the verified-data gate is active. This country module must be source-linked, date-stamped and reviewed by qualified local professionals before exact values are shown.`;
}

export function buildVerifiedGateAnswer(input: AdvisorInput) {
  const fromVerified = isVerified(input.fromCountry);
  const toVerified = isVerified(input.toCountry);
  const exactAllowed = fromVerified && toVerified;

  return {
    scenario: `${input.persona} • ${input.fromCountry} → ${input.toCountry}`,
    verification: {
      fromCountryVerified: fromVerified,
      toCountryVerified: toVerified,
      exactTaxValuesShown: exactAllowed,
      exactSocialSecurityValuesShown: exactAllowed,
      definitiveLegalConclusionsShown: exactAllowed,
      gate: exactAllowed ? "OPEN_FOR_VERIFIED_MODULES" : "ACTIVE"
    },
    risk: exactAllowed ? "Verified module available" : "Requires expert verification",
    legal: exactAllowed
      ? ["Verified country modules are available. Display source-linked values and reviewed rules only."]
      : [
          "Identify employment relationship: employee, freelancer/self-employed, EOR, contractor or local entity.",
          "Confirm residence, habitual work location, employer control, permanence, exclusivity and supervision.",
          "Review local employment contract, termination, working time, payroll and registration obligations.",
          exactDataBlockedMessage(input.fromCountry),
          exactDataBlockedMessage(input.toCountry)
        ],
    tax: exactAllowed
      ? { shown: true, reason: "Verified modules available. Use country module values." }
      : { shown: false, reason: "Exact tax simulation is blocked until country modules are verified. The simulator UI stays locked and converts to expert review." },
    socialSecurity: exactAllowed
      ? { shown: true, reason: "Verified modules available. Use country module values." }
      : { shown: false, reason: "Exact social-security comparison is blocked until country modules are verified." },
    recommendation: exactAllowed
      ? "Use the reviewed country module and proceed with Workora implementation checklist."
      : "Use this answer as general information only. For implementation, book Workora expert review to verify country-specific legal, tax, payroll and social-security obligations.",
    nextSteps: [
      "Confirm countries, role type and worker residence",
      "Run verified country module check",
      "Collect official source links and tax year",
      "Have Workora legal/tax/payroll partner review",
      "Proceed with EOR, entity, contractor or freelancer setup only after verification"
    ],
    workoraCTA: "Book Workora setup and expert review.",
    disclaimer: legalDisclaimer()
  };
}
