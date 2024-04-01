// import { useRoutes } from "react-router-dom";
// import Themeroutes from "./routes/Router";

// const App = () => {
//   const routing = useRoutes(Themeroutes);

//   return <div className="dark">{routing}</div>;
// };

// export default App;

// import { useEffect } from "react";
// import { useRoutes, Navigate } from "react-router-dom";
// import Themeroutes from "./routes/Router";
// import useAuth from "./hooks/useAuth";

// const App = () => {
//   const { isAdminAuthenticated } = useAuth();

//   // Call useRoutes unconditionally at the top level
//   const routing = useRoutes(Themeroutes);

//   // Redirect to login page if admin is not authenticated
//   if (!isAdminAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <div className="dark">{routing}</div>;
// };

// export default App;

// import { Suspense } from "react";
// import { useRoutes, Navigate } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import FullLayout from "./layouts/FullLayout";
// import Starter from "./views/Starter";
// import About from "./views/About";
// import Alerts from "./views/ui/Alerts";
// import Users from "./views/ui/Users";
// import ExpertsSubs from "./views/ui/ExpertsSubs";
// import Badges from "./views/ui/Badges";
// import Buttons from "./views/ui/Buttons";
// import Cards from "./views/ui/Cards";
// import Grid from "./views/ui/Grid";
// import Tables from "./views/ui/Tables";
// import Forms from "./views/ui/Forms";
// import Breadcrumbs from "./views/ui/Breadcrumbs";
// import ProfileEdit from "./views/ui/ProfileEdit";
// import Login from "./views/Login";
// import useAuth from "./hooks/useAuth";

// const App = () => {
//   const { isAdminAuthenticated } = useAuth();

//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/login" component={Login} />
//           {isAdminAuthenticated ? (
//             <FullLayout>
//               <Routes>
//                 <Route path="/" exact component={Starter} />
//                 <Route path="/about" component={About} />
//                 <Route path="/alerts" component={Alerts} />
//                 <Route path="/users" component={Users} />
//                 <Route path="/experts_subs" component={ExpertsSubs} />
//                 <Route path="/badges" component={Badges} />
//                 <Route path="/buttons" component={Buttons} />
//                 <Route path="/cards" component={Cards} />
//                 <Route path="/grid" component={Grid} />
//                 <Route path="/table" component={Tables} />
//                 <Route path="/forms" component={Forms} />
//                 <Route path="/breadcrumbs" component={Breadcrumbs} />
//                 <Route path="/profile_edit" component={ProfileEdit} />
//                 <Navigate to="/" />
//               </Routes>
//             </FullLayout>
//           ) : (
//             <Navigate to="/login" />
//           )}
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default App;

// import { Suspense } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import FullLayout from "./layouts/FullLayout";
// import Starter from "./views/Starter";
// import About from "./views/About";
// import Alerts from "./views/ui/Alerts";
// import Users from "./views/ui/Users";
// import ExpertsSubs from "./views/ui/ExpertsSubs";
// import Badges from "./views/ui/Badges";
// import Buttons from "./views/ui/Buttons";
// import Cards from "./views/ui/Cards";
// import Grid from "./views/ui/Grid";
// import Tables from "./views/ui/Tables";
// import Forms from "./views/ui/Forms";
// import Breadcrumbs from "./views/ui/Breadcrumbs";
// import ProfileEdit from "./views/ui/ProfileEdit";
// import Login from "./views/Login";
// import useAuth from "./hooks/useAuth";
// import RequireAuth from "./components/RequireAuth";

// const App = () => {
//   const { isAdminAuthenticated } = useAuth();

//   return (
//     // <Router>
//       // <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<FullLayout />} />
//           <Route
//             path="/"
//             element={isAdminAuthenticated ? (
//               <FullLayout>
//                 <Route path="/" element={<Starter />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/alerts" element={<Alerts />} />
//                 <Route path="/users" element={<Users />} />
//                 <Route path="/experts_subs" element={<ExpertsSubs />} />
//                 <Route path="/badges" element={<Badges />} />
//                 <Route path="/buttons" element={<Buttons />} />
//                 <Route path="/cards" element={<Cards />} />
//                 <Route path="/grid" element={<Grid />} />
//                 <Route path="/table" element={<Tables />} />
//                 <Route path="/forms" element={<Forms />} />
//                 <Route path="/breadcrumbs" element={<Breadcrumbs />} />
//                 <Route path="/profile_edit" element={<ProfileEdit />} />
//                 <Navigate to="/" replace />
//               </FullLayout>
//             ) : (
//               <Navigate to="/login" replace />
//             )}
//           />
//         </Routes>
//       // </Suspense>
//     // </Router>
//   );
// };

// export default App;

import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import FullLayout from "./layouts/FullLayout";
import Subscriptions from "./views/ui/Subscriptions";
import PersistLogin from "./components/PersistLogin";

const Starter = lazy(() => import("./views/Starter"));
const About = lazy(() => import("./views/About"));
const Alerts = lazy(() => import("./views/ui/Alerts"));
const Users = lazy(() => import("./views/ui/Users"));
const ExpertsSubs = lazy(() => import("./views/ui/ExpertsSubs"));
const Badges = lazy(() => import("./views/ui/Badges"));
const Buttons = lazy(() => import("./views/ui/Buttons"));
const Cards = lazy(() => import("./views/ui/Cards"));
const Grid = lazy(() => import("./views/ui/Grid"));
const Tables = lazy(() => import("./views/ui/Tables"));
const Forms = lazy(() => import("./views/ui/Forms"));
const Breadcrumbs = lazy(() => import("./views/ui/Breadcrumbs"));
const ProfileEdit = lazy(() => import("./views/ui/ProfileEdit"));
const UserProfile = lazy(() => import("./views/ui/Profile"));

const Login = lazy(() => import("./views/Login"));

const Unauthorized = lazy(() =>
  import("./components/unauthorized/Unauthorized")
);
const Missing = lazy(() => import("./components/missing/404"));

const App = () => {
  return (
    <Routes>
      {/* <Route path="/"> */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={"Administrateur"} />}>
          <Route path="/" exact element={<FullLayout />}>
            {/* <Route element={<RequireAuth allowedRoles={["Administrateur"]} />}> */}
            <Route path="/" element={<Starter />} />
            <Route path="/starter" element={<Starter />} />
            <Route path="/about" element={<About />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/experts_subs" element={<ExpertsSubs />} />
            <Route path="/abonnements" element={<Subscriptions />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/grid" element={<Grid />} />
            <Route path="/table" element={<Tables />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/breadcrumbs" element={<Breadcrumbs />} />
            <Route path="/profile_edit" element={<ProfileEdit />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default App;

// import React, { Suspense } from "react";
// import {  Route, Routes } from "react-router-dom";
// import Loader from "./layouts/loader/Loader";
// import RequireAuth from "./components/RequireAuth";
// import routes from "./routes/Router";

// const App = () => {
//   return (
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           {routes.map((route, index) => (
//             <Route
//               key={index}
//               path={route.path}
//               element={
//                 route.requiresAuth ? (
//                   <RequireAuth allowedRoles={route.allowedRoles}>
//                     {route.element}
//                   </RequireAuth>
//                 ) : (
//                   route.element
//                 )
//               }
//               children={route.children}
//             />
//           ))}
//         </Routes>
//       </Suspense>
//   );
// };

// export default App;
