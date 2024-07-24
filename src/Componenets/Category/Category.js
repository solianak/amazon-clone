
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







//export async function getServerSideProps(context){
//const Category=await fetch("https://fakestoreapi.com/products") .then((res=>res.json()); return { props: Category{

// }}}

//get>> https://fakestoreapi.com/products
