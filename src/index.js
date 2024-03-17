import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./layouts/loader/Loader";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <Suspense fallback={<Loader />}> */}
          <Routes>
            <Route path="/*" element={<App />} />
            {/* <HashRouter> */}
            {/* <App /> */}
            {/* </HashRouter> */}
          </Routes>
        {/* </Suspense> */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>

  // document.getElementById("root")
);

// root.render(
//   <Suspense fallback={<Loader />}>
//     {/* <HashRouter> */}
//       <App />
//     {/* </HashRouter> */}
//   </Suspense>,

//   // document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React, { Suspense } from "react";
// import { createRoot } from 'react-dom/client';
// import "./assets/scss/style.scss";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { HashRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider
// import RequireAuth from "./components/RequireAuth"; // Import RequireAuth
// import Loader from "./layouts/loader/Loader";

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// root.render(
//   <Suspense fallback={<Loader />}>
//     <AuthProvider> {/* Wrap App with AuthProvider */}
//       <HashRouter>
//         <RequireAuth allowedRoles={['Administrateur']}> {/* Protect routes */}
//           <App />
//         </RequireAuth>
//       </HashRouter>
//     </AuthProvider>
//   </Suspense>
// );

// reportWebVitals();

// import React, { Suspense } from "react";
// import "./assets/scss/style.scss";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { HashRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider
// import RequireAuth from "./components/RequireAuth"; // Import RequireAuth
// import Loader from "./layouts/loader/Loader";
// import ReactDOM from "react-dom";

// ReactDOM.render(
//   <Suspense fallback={<Loader />}>
//     <AuthProvider> {/* Wrap App with AuthProvider */}
//       <HashRouter>
//         <RequireAuth allowedRoles={['Administrateur']}> {/* Protect routes */}
//           <App />
//         </RequireAuth>
//       </HashRouter>
//     </AuthProvider>
//   </Suspense>,
//   document.getElementById('root')
// );

// reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
