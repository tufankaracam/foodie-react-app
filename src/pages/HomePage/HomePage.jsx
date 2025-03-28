import css from "./HomePage.module.css";
import { Section, Container, Btn } from "components/UI";
import Recipes from "components/Recipes/Recipes";
import Hero from "components/Hero/Hero";
import PageTitle from "components/PageTitle/PageTitle";
import CategoriesList from "components/CategoriesList/CategoriesList";
import Testimonials from "components/Testimonials/Testimonials";

import { fetchCategories, fetchRecipes } from "store/recipes/operations";

import {
  selectLoading,
  selectError,
  selectRecipes,
  selectCategories,
} from "store/recipes/selectors";
import { selectTestimonials } from "store/testimonials/selectors";
import { fetchTestimonials } from "store/testimonials/operations";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useScrollToElement from "../../hooks/useScrollToElement";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollToElement = useScrollToElement();
  const isLoading = useSelector(selectLoading);
  const hasError = useSelector(selectError);
  const categories = useSelector(selectCategories);
  const testimonials = useSelector(selectTestimonials);
  const [isShowAll, setIsShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const pageTitle = {
    title: "Categories",
    subtitle:
      "Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.",
  };

  const heroProps = {
    title: "Improve Your Culinary Talents",
    subtitle:
      "Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.",
  };

  const modifyedCategories = isShowAll
    ? categories
    : [...categories].slice(0, 11);

  const setCategory = (id) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setActiveCategory({ id: category.id, name: category.name });
      setTimeout(() => scrollToElement("homepage-categories"), 100);
    } else {
      setActiveCategory(null);
    }
  };

  const onSelectCategory = async (id) => {
    const resultAction = await dispatch(
      fetchRecipes({
        category: id,
        limit: 12,
        page: 1,
      })
    );

    if (resultAction.meta.requestStatus === "fulfilled") {
      setCategory(id);
    } else {
      const errorMessage = resultAction.payload || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Hero {...heroProps}>
        <Btn
          variant="outlined"
          className={css.heroBtn}
          onClick={() => navigate("/catalog")}
        >
          Add recipe
        </Btn>
      </Hero>
      <Section id="homepage-categories" className={css.section}>
        <Container>
          {!activeCategory ? (
            <>
              <PageTitle {...pageTitle} />
              <CategoriesList
                categories={modifyedCategories}
                isShowAll={isShowAll}
                onClickCategory={onSelectCategory}
                onClickShowAll={() => setIsShowAll(true)}
              />
            </>
          ) : (
            <Recipes
              activeCategory={activeCategory}
              onUpdateActiveCategory={setCategory}
              recipes={recipes}
            />
          )}
          <Toaster position="bottom-center" reverseOrder={false} />
        </Container>
      </Section>

      <Section style={{ marginBottom: 80 }}>
        <Container>
          <Testimonials testimonials={testimonials} />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
