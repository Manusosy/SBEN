import { Route, Routes } from 'react-router-dom';
import Programs from '@/pages/Programs';
import MentorshipProgram from '@/pages/MentorshipProgram';
import EducationInitiatives from '@/pages/EducationInitiatives';
import CommunityDevelopment from '@/pages/CommunityDevelopment';

export const ProgramRoutes = () => {
  return (
    <Routes>
      <Route index element={<Programs />} />
      <Route path="mentorship" element={<MentorshipProgram />} />
      <Route path="education" element={<EducationInitiatives />} />
      <Route path="community" element={<CommunityDevelopment />} />
    </Routes>
  );
};
