import { Routes, Route } from "react-router-dom";

 import Home from "../pages/public/Home";
import Login from "../admin/pages/Login";

import Dashboard from "../admin/pages/Dashboard";

import ProjectList from "../admin/pages/projects/ProjectList";

import ProtectedRoute from "../admin/routes/ProtectedRoute";

import AdminLayout from "../admin/layouts/AdminLayout";
import CreateProject from "../admin/pages/projects/CreateProject";
import EditProject from "../admin/pages/projects/EditProject";
import SkillList from "../admin/pages/skills/SkillList";
import CreateSkill from "../admin/pages/skills/CreateSkill";
import EditSkill from "../admin/pages/skills/EditSkill";
import ProfessionalSkillList from "../admin/pages/professionalSkills/ProfessionalSkillList";
import CreateProfessionalSkill from "../admin/pages/professionalSkills/CreateProfessionalSkill";
import EditProfessionalSkill from "../admin/pages/professionalSkills/EditProfessionalSkill";
import ExperienceList from "../admin/pages/experiences/ExperienceList";
import CreateExperience from "../admin/pages/experiences/CreateExperience";
import EditExperience from "../admin/pages/experiences/EditExperience";
import SocialList from "../admin/pages/social/SocialList";
import CreateSocial from "../admin/pages/social/CreateSocial";
import EditSocial from "../admin/pages/social/EditSocial";
import MessageList from "../admin/pages/messages/MessageList";
import Profile from "../admin/pages/profile/Profile";
import ChangePassword from "../admin/pages/profile/ChangePassword";
function AppRoutes() {

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/admin/login"
        element={<Login />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="projects"
          element={<ProjectList />}
        />

        <Route
          path="projects/create"
          element={<CreateProject />}
        />

        <Route
          path="projects/edit/:id"
          element={<EditProject />}
        />

        <Route
          path="skills"
          element={<SkillList />}
        />

        <Route
          path="skills/create"
          element={<CreateSkill />}
        />

        <Route
          path="skills/edit/:id"
          element={<EditSkill />}
        />

        <Route
          path="professional-skills"
          element={<ProfessionalSkillList />}
        />

        <Route
          path="professional-skills/create"
          element={<CreateProfessionalSkill />}
        />

        <Route
          path="professional-skills/edit/:id"
          element={<EditProfessionalSkill />}
        />

        <Route
          path="experiences"
          element={<ExperienceList />}
        />

        <Route
          path="experiences/create"
          element={<CreateExperience />}
        />

        <Route
          path="experiences/edit/:id"
          element={<EditExperience />}
        />

        <Route
          path="social"
          element={<SocialList />}
        />

        <Route
          path="social/create"
          element={<CreateSocial />}
        />

        <Route
          path="social/edit/:id"
          element={<EditSocial />}
        />

        <Route
          path="messages"
          element={<MessageList />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        <Route
          path="change-password"
          element={<ChangePassword />}
        />
      </Route>

    </Routes>

  );

}

export default AppRoutes;