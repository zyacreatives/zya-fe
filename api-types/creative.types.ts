import { ExperienceLevel, OnboardingPage, Role } from ".";

export type CreativeEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  pfpUrl: string;
  experienceLevel: ExperienceLevel;
  email: string;
  emailVerified: boolean;
  name: string;
  userImageUrl: string;
  username: string;
  onboardingPage: OnboardingPage;
  role: Role;
  bio: string;
  location: string;
  disciplines: string[];
  tags: string[];
};

export type CreateCreativeEndpointData = {
    
}
