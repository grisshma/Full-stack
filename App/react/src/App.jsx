import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ServicePage from "./Pages/ServicePage";
import ContactPage from "./Pages/ContactPage";
import NotFound from "./Pages/NotFound";
import LoginPage from "./Pages/LoginPage";
import UserLayout from "./Layout/UserLayout";
import RegisterPage from "./Pages/RegisterPage";
import Api from "./Pages/Api";

import SinglePage from "./Pages/SinglePage";
import Table from "./Pages/Table";
import AddProduct from "./Pages/AddProduct";
import TodoList from "./Pages/TodoList";

const App = () => {
  // const AdminLayout = () => {
  //   return (
  //     <>
  //       <Topbar />
  //       <div className="flex">
  //         <Sidebar />
  //         <Outlet />
  //       </div>
  //     </>
  //   );
  // };

  const route = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/service",
          element: <ServicePage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },

        {
          path: "/add-product",
          element: <AddProduct />,
        },
        {
          path: "/table",
          element: <Table />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/api",
      element: <Api />,
    },
    {
      path: "/products/:id",
      element: <SinglePage />,
    },

    {
      path: "/todo",
      element: <TodoList />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    // {
    //   path: "/dashboard",
    //   element: <AdminLayout/>,
    //   children: [
    //     {
    //       path: "/dashboard",
    //       element: <DashboardHome/>

    //     },
    //     {
    //       path: "/dashboard/user-management",
    //       element: <UserManagement/>
    //     }
    //   ]

    // }
  ]);

  return (
    <>
      <RouterProvider router={route} />
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/single/:id" element={<SinglePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
    </>
  );
};

export default App;