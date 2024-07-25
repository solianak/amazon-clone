
import { CategoryData } from "./CategoryData";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

const Category = () => {
    
  return (
    <section className={classes.category_container}>
      {CategoryData.map((data, index) => (
        <CategoryCard key={index} data={data} />
      ))}
    </section>
  );
};

export default Category;





