export type Diagnosis = {
  id: string;
  name: string;
  icd10: string | null;
  status: string;
  onset: string;
  notes: string;
};

export type Medication = {
  id: string;
  name: string;
  dose: string;
  route: string;
  frequency: string;
  prescriber: string;
  indication: string;
  status: string;
  source: string;
};

export type Allergy = {
  id: string;
  allergen: string;
  reaction: string;
  severity: string;
  status: string;
};

export type Therapy = {
  id: string;
  type: string;
  providerName: string;
  frequency: string;
  goalsSummary: string;
  status: string;
};

export type CareTeamMember = {
  id: string;
  name: string;
  role: string;
  org: string;
  phone: string;
  email: string;
};

export type Grant = {
  id: string;
  templateKey: string;
  templateName: string;
  recipient: string;
  granteeOrgId: string | null;
  status: 'active' | 'revoked' | 'expired';
  expiresAt: string;
  createdAt: string;
  token: string;
  viewCount: number;
};

export type TimelineEvent = {
  id: string;
  type: string;
  title: string;
  body: string;
  attribution: { org: string; clinician: string; at: string } | null;
  createdAt: string;
};

export type DemoState = {
  child: {
    id: string;
    preferredName: string;
    legalName: string;
    ageBand: string;
    dobDisplay: string;
    sex: string;
    parentName: string;
    parentEmail: string;
  };
  diagnoses: Diagnosis[];
  medications: Medication[];
  allergies: Allergy[];
  therapies: Therapy[];
  devices: unknown[];
  education: {
    planType: string;
    classification: string;
    accommodations: string;
    lastReviewDate: string;
    school: string;
  } | null;
  emergencyCard: {
    oneLiners: string[];
    criticalAllergies: string[];
    criticalMeds: string[];
    contacts: { name: string; phone: string }[];
    hospitalPreference: string;
    notes: string;
  };
  preferredCommunication: {
    sensoryNotes: string;
    howToTalk: string;
    triggers: string;
    strategies: string;
  };
  careTeam: CareTeamMember[];
  grants: Grant[];
  timeline: TimelineEvent[];
  providerOrg: {
    id: string;
    name: string;
    role: string;
    clinicianName: string;
    baaStatus: string;
  };
  roster: {
    childId: string;
    displayName: string;
    ageBand: string;
    grantId: string;
    packetLabel: string;
    lastUpdated: string;
    status: string;
  }[];
};

export const PACKET_TEMPLATES = [
  {
    key: 'specialist_intake',
    name: 'New Specialist Intake',
    description: 'Demographics, diagnoses, meds, allergies, care team, therapies, emergency card, communication prefs',
    sections: ['diagnoses', 'medications', 'allergies', 'therapies', 'careTeam', 'emergency', 'communication'],
  },
  {
    key: 'school_ihp',
    name: 'School Nurse IHP',
    description: 'Emergency card, meds, allergies, devices, contacts, relevant diagnoses',
    sections: ['emergency', 'medications', 'allergies', 'devices', 'diagnoses'],
  },
  {
    key: 'aba_intake',
    name: 'ABA Intake',
    description: 'Diagnoses, therapies, developmental notes, IEP/504, meds, behavior prefs',
    sections: ['diagnoses', 'therapies', 'education', 'medications', 'communication'],
  },
] as const;
