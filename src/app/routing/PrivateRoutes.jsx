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
import { ManageClasses } from "../pages/Manage CLasses/ManageClasses";
import { ClassView } from "../pages/Manage CLasses/ClassView";
import { UpdateClasses } from "../pages/Manage CLasses/UpdateClasses";
import { CustomSessions } from "../pages/Manage CLasses/CustomSessions";
import { AddNewRecording } from "../pages/Manage CLasses/AddNewRecording";
import { UpdateRecordedClass } from "../pages/Manage CLasses/UpdateRecordedClass";
import { RecordedClasses } from "../pages/Manage CLasses/RecordedClasses";
import { AddNewClass } from "../pages/Manage CLasses/AddNewClass";
import UserList from "../pages/Manage Users/User List/UserList";
import { UserView } from "../pages/Manage Users/User List/UserView";
import { PersonalUserUpdate } from "../pages/Manage Users/User List/PersonalUserUpdate";
import { ZoomMeeetingRoom2 } from "../pages/Manage CLasses/ZoomMeeetingRoom2";

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

<Route
          path='classes/*'
          element={
            <SuspensedView>
              <ManageClasses/>
            </SuspensedView>
          }
        />
        <Route
          path='classes/add_class/*'
          element={
            <SuspensedView>
              <AddNewClass/>
            </SuspensedView>
          }
        />

<Route
          path="classes/zoom-meeting/*"
          element={
            <SuspensedView>
              <ZoomMeeetingRoom2 />
            </SuspensedView>
          }
        />

<Route
          path='classes/class_view/:id'
          element={
            <SuspensedView>
              <ClassView/>
            </SuspensedView>
          }
        />
        <Route
          path='classes/class_update/:id'
          element={
            <SuspensedView>
              <UpdateClasses/>
            </SuspensedView>
          }
        />
        <Route
          path='custom_sessions/*'
          element={
            <SuspensedView>
              <CustomSessions/>
            </SuspensedView>
          }
        />
        <Route
          path='recorded_classes/add_class_recording/*'
          element={
            <SuspensedView>
              <AddNewRecording/>
            </SuspensedView>
          }
        />

<Route
          path='recorded_classes/update/:id*'
          element={
            <SuspensedView>
              <UpdateRecordedClass/>
            </SuspensedView>
          }
        />

<Route
          path='recorded_classes/*'
          element={
            <SuspensedView>
              <RecordedClasses/>
            </SuspensedView>
          }
        />

<Route
            path='clients/*'
            element={
              <SuspensedView>
                <UserList/>
              </SuspensedView>
            }
          />

<Route
          path='clients/user_view/:id*'
          element={
            <SuspensedView>
              <UserView />
            </SuspensedView>
          }
        />

<Route
          path='clients/personalUserUpdate/:id*'
          element={
            <SuspensedView>
              <PersonalUserUpdate />
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
