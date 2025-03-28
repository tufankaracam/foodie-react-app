import React from "react";
import { useSelector } from "react-redux";
import PathInfo from "../../components/PathInfo/PathInfo";
import PageTitle from "../../components/PageTitle/PageTitle";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
// import UploadPhoto from "../../components/UploadPhoto/UploadPhoto";
import styles from "./AddRecipePage.module.css";

const pageTitle = {
  title: "Add recipe",
  subtitle:
    "Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.",
};

const AddRecipePage = () => {
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" />;
  //   }

  const pages = [
    { path: "/", name: "Home" },
    { path: "/recipe/add", name: "Add Recipe" },
  ];

  return (
    <div className={styles.container}>
      <PathInfo pages={pages} />
      <PageTitle {...pageTitle} />
      <div className={styles.content}>
        {/* <UploadPhoto /> */}
        <AddRecipeForm />
      </div>
    </div>
  );
};

export default AddRecipePage;
