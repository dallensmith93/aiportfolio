import { Suspense, lazy } from "react";
import type { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { SiteLayout } from "../features/layout/SiteLayout";

const HomePage = lazy(() =>
  import("../features/pages/HomePage").then((module) => ({
    default: module.HomePage
  }))
);
const ProjectsPage = lazy(() =>
  import("../features/pages/ProjectsPage").then((module) => ({
    default: module.ProjectsPage
  }))
);
const ProjectDetailPage = lazy(() =>
  import("../features/pages/ProjectDetailPage").then((module) => ({
    default: module.ProjectDetailPage
  }))
);
const PlaygroundPage = lazy(() =>
  import("../features/pages/PlaygroundPage").then((module) => ({
    default: module.PlaygroundPage
  }))
);
const AboutPage = lazy(() =>
  import("../features/pages/AboutPage").then((module) => ({
    default: module.AboutPage
  }))
);
const ResumePage = lazy(() =>
  import("../features/pages/ResumePage").then((module) => ({
    default: module.ResumePage
  }))
);
const NotFoundPage = lazy(() =>
  import("../features/pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage
  }))
);

function RouteLoader() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      Loading...
    </div>
  );
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "projects", element: withSuspense(<ProjectsPage />) },
      { path: "projects/:slug", element: withSuspense(<ProjectDetailPage />) },
      { path: "playground", element: withSuspense(<PlaygroundPage />) },
      { path: "about", element: withSuspense(<AboutPage />) },
      { path: "resume", element: withSuspense(<ResumePage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) }
    ]
  }
]);
