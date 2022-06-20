import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  getProduct } from "../actions/ProductAction";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat,filters, sort }) => {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  const {
    products,
 
  } = useSelector((state) => state.products);

  

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);


   useEffect(() => {
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, filters]);

  useEffect(() => {
    if(sort === "newest"){
      setFilterProducts((prev) =>
        [...prev].sort((a,b) => a.createdAt - b.createdAt)
      );
    } else if(sort === "asc") {
      setFilterProducts((prev) => 
        [...prev].sort((a,b) => a.price - b.price)
      );
    } else {
      setFilterProducts((prev) => 
        [...prev].sort((a,b)=> b.price - a.price)
      );
    }
  },[sort])

  console.log(filterProducts);
  return (
    <Container>
          { sort
        ? filterProducts.map((item) => (<Product item={item} key={item.id} />))
            :  products.map((item) => (
                <Product item={item} key={item.id} />
              ))}
  </Container>
  );
};

export default Products;

