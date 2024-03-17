// import { lazy } from "react";
// import { Navigate } from "react-router-dom";

// /****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

// /***** Pages ****/

// const Starter = lazy(() => import("../views/Starter.js"));
// const About = lazy(() => import("../views/About.js"));
// const Alerts = lazy(() => import("../views/ui/Alerts"));
// const Users = lazy(() => import("../views/ui/Users"));
// const ExpertsSubs = lazy(() => import("../views/ui/ExpertsSubs"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
// const ProfileEdit = lazy(() => import("../views/ui/ProfileEdit"));
// const Login = lazy(() => import("../views/Login.js"));

// /*****Routes******/

// const ThemeRoutes = [
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       { path: "/", element: <Navigate to="/starter" /> },
//       { path: "/starter", exact: true, element: <Starter /> },
//       { path: "/about", exact: true, element: <About /> },
//       { path: "/alerts", exact: true, element: <Alerts /> },
//       { path: "/users", exact: true, element: <Users /> },
//       { path: "/experts_subs", exact: true, element: <ExpertsSubs /> },
//       { path: "/badges", exact: true, element: <Badges /> },
//       { path: "/buttons", exact: true, element: <Buttons /> },
//       { path: "/cards", exact: true, element: <Cards /> },
//       { path: "/grid", exact: true, element: <Grid /> },
//       { path: "/table", exact: true, element: <Tables /> },
//       { path: "/forms", exact: true, element: <Forms /> },
//       { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
//       { path: "/profile_edit", exact: true, element: <ProfileEdit /> },
//     ],
//   },
// ];

// export default ThemeRoutes;

// import { lazy } from "react";

// // Lazy-loaded components
// const FullLayout = lazy(() => import("../layouts/FullLayout"));
// const Login = lazy(() => import("../views/Login"));
// const Unauthorized = lazy(() => import("../components/Unauthorized"));
// const Starter = lazy(() => import("../views/Starter"));
// const About = lazy(() => import("../views/About"));
// const Alerts = lazy(() => import("../views/ui/Alerts"));
// const Users = lazy(() => import("../views/ui/Users"));
// const ExpertsSubs = lazy(() => import("../views/ui/ExpertsSubs"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
// const ProfileEdit = lazy(() => import("../views/ui/ProfileEdit"));
// const Missing = lazy(() => import("../components/404"));

// // Define routes
// const routes = [
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Starter />,
//         requiresAuth: true,
//         allowedRoles: ["Administrator"],
//       },
//       { path: "/starter", element: <Starter /> },
//       { path: "/login", element: <Login /> },
//       { path: "/unauthorized", element: <Unauthorized /> },
//       { path: "/about", element: <About /> },
//       { path: "/alerts", element: <Alerts /> },
//       { path: "/users", element: <Users /> },
//       { path: "/experts_subs", element: <ExpertsSubs /> },
//       { path: "/badges", element: <Badges /> },
//       { path: "/buttons", element: <Buttons /> },
//       { path: "/cards", element: <Cards /> },
//       { path: "/grid", element: <Grid /> },
//       { path: "/table", element: <Tables /> },
//       { path: "/forms", element: <Forms /> },
//       { path: "/breadcrumbs", element: <Breadcrumbs /> },
//       { path: "/profile_edit", element: <ProfileEdit /> },
//       { path: "*", element: <Missing /> },
//     ],
//   },
// ];

// export default routes;
