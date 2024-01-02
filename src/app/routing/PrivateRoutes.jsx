import { FC, Suspense, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";

import MyProfile from "../pages/settings/MyProfile";

import { Private } from "../modules/apps/chat/components/Private";
import { Group } from "../modules/apps/chat/components/Group";
import UserContext from "../../Context/UserContext";

import { RecordClasses } from "../pages/Manage Corporate/RecordClasses";
import { MyProfileMain } from "../pages/ManageTrainers/MyProfileMain";
import { TrianersProfiels } from "../pages/Manage Corporate/TrianersProfiels";
import Information from "../pages/Manage Client/Complains/Information";
import LiveClasses from "../pages/Manage Client/User List/LiveClasses";
import { TrainersProfielView } from "../pages/Manage Corporate/TrainersProfielView";
import { ZoomMeeetingRoom } from "../pages/Manage Client/User List/ZoomMeeetingRoom";

const PrivateRoutes = () => {
  const { userPermisson } = useContext(UserContext);
  // const userPermisson=JSON.parse(sessionStorage.getItem('userPermisson'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}

        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />

        <Route path="menu-test" element={<MenuTestPage />} />

        <Route
          path="record-classes/*"
          element={
            <SuspensedView>
              <RecordClasses />
            </SuspensedView>
          }
        />

        <Route
          path="trainers-profile/*"
          element={
            <SuspensedView>
              <TrianersProfiels />
            </SuspensedView>
          }
        />

        <Route
          path="trainers-profile/trainer_view/:id"
          element={
            <SuspensedView>
              <TrainersProfielView />
            </SuspensedView>
          }
        />

        <Route
          path="my-profile/*"
          element={
            <SuspensedView>
              <MyProfileMain />
            </SuspensedView>
          }
        />

        <Route
          path="settings/myprofile/*"
          element={
            <SuspensedView>
              <MyProfile />
            </SuspensedView>
          }
        />

        <Route
          path="live-classes/*"
          element={
            <SuspensedView>
              <LiveClasses />
            </SuspensedView>
          }
        />

<Route
          path="live-classes/zoom-meeting/*"
          element={
            <SuspensedView>
              <ZoomMeeetingRoom />
            </SuspensedView>
          }
        />

        <Route
          path="information*"
          element={
            <SuspensedView>
              <Information />
            </SuspensedView>
          }
        />

        {userPermisson.PrivateChat && (
          <Route
            path="trainers-profile/trainer_view/:id/chats/*"
            element={
              <SuspensedView>
                <Private />
              </SuspensedView>
            }
          />
        )}

        <Route
          path="chats/group-chat/*"
          element={
            <SuspensedView>
              <Group />
            </SuspensedView>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView = ({ children }) => {
  const baseColor = getCSSVariableValue("--kt-primary");
  TopBarProgress.config({
    barColors: {
      0: baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
