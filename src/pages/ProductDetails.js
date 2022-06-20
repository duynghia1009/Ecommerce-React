import { Fragment, useState,useEffect } from "react";
// import { useAlert } from "react-alert";
import { useDispatch } from "react-redux"
import Carousel from "react-material-ui-carousel";
import { useLocation } from "react-router-dom";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../actions/CartAction";

import { getProductDetails } from "../actions/ProductAction";
import axios from "axios";
  import authHeader from "../services/auth-header";



const ProductDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    // const alert = useAlert();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     dispatch(getProductDetails(id));
    // }, [dispatch]);


    useEffect(() => {
        const getProduct = async () => {
            try {
                const API_URL = "http://localhost:8083/api/product/";
                const res = await axios.get(API_URL + id, { headers: authHeader() });
                setProduct(res.data);
            } catch { }
        };
        getProduct();
    }, [id]);


    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    }

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");




    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        // alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        // myForm.set("productId", match.params.id);

        // dispatch(newReview(myForm));

        setOpen(false);
    };

    return (
        <Fragment>
            {
                 (
                    <Fragment>
                        <MetaData title={`${product.name} --Ecommerce`} />
                        <div className="ProductDetails">
                            <div>
                               
                                    
                                        <img
                                            className="CarouselImage"
                                            
                                            src={`${product.imageUrl}`}
                                            
                                        />
                                 
                               
                            </div>

                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p>Product # {product.id}</p>
                                </div>
                                <div className="detailsBlock-2">
                                    <Rating {...options} />
                                    <span className="detailsBlock-2-span">
                                        {" "}
                                    ({product.numOfReviews} Reviews)
                                    </span>
                                </div>

                                <div className="detailsBlock-3">
                                    <h1>{`₹${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input readOnly type="number" value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button
                                            disabled={product.stock < 1 ? true : false}
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    <p>
                                        Status:
                                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                            {product.stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>
                                </div>

                                <div className="detailsBlock-4">
                                    Description : <p>{product.description}</p>
                                </div>

                                <button onClick={submitReviewToggle} className="submitReview">
                                    Submit Review
                                </button>
                            </div>
                        </div>

                        <h3 className="reviewsHeading">REVIEWS</h3>

                        <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />

                                <textarea
                                    className="submitDialogTextArea"
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {product.reviews &&
                                    product.reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))}
                            </div>
                        ) : (
                            <p className="noReviews">No Reviews Yet</p>
                        )}
                    </Fragment>
                )
            }
        </Fragment>
    )

}

export default ProductDetails;





