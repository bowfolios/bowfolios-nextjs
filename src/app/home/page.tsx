/* eslint-disable import/extensions */
import React from 'react';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { authOptions } from '../api/auth/[...nextauth]/route';
import HomePage from './HomePage';

const HomePageHelper = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null
  );
  const email = (session && session.user && session.user.email) || '';
  const profile = await prisma.profile.findUnique({
    where: { email },
  });
  const interests = await prisma.interest.findMany();
  // const allInterestNames = interests.map((interest) => interest.name);
  const projects = await prisma.project.findMany();
  // const allProjectNames = projects.map((project) => project.name);
  const profileInterests = await prisma.profileInterest.findMany({
    where: { profileId: profile!.id },
  });
  const profileInterestNames = profileInterests.map((profileInterest) => {
    const i = interests.find((interest) => interest.id === profileInterest.interestId);
    return i ? i.name : '';
  });
  console.log(profileInterestNames);
  const profileProjects = await prisma.profileProject.findMany({
    where: { profileId: profile!.id },
  });
  const profileProjectNames = profileProjects.map((profileProject) => {
    const p = projects.find((project) => project.id === profileProject.projectId);
    return p ? p.name : '';
  });
  console.log(
    // interests,
    // projects,
    // profileInterests,
    // profileProjects,
    profileInterestNames,
    profileProjectNames
  );
  return <HomePage />;
};

export default HomePageHelper;
