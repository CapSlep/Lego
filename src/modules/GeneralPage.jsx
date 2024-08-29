import { DataContext, useData } from "../DataContext";
import { useEffect, useState } from "react";
import Slider from "./Slider";
import DropdownContainer from "./DropdownContainer";

export default function GeneralPage({
    showPage,
    buyHandler,
    selectedProduct,
    setSelectedProduct,
}) {
    const data = useData();
    const [isHidden, setIsHidden] = useState(true);
    const [isFading, setIsFading] = useState(false);

    function handleProductSelection(selectedName) {
        const filteredProducts = data.products.filter((product) => {
            return product.name === selectedName;
        });

        setSelectedProduct(filteredProducts[0]); // Assuming you want to set the first match
    }

    useEffect(() => {
        if (showPage) {
            const timer = setTimeout(() => setIsHidden(false), 500); // Delay hiding after fade-out
            const fadeTimer = setTimeout(() => setIsFading(true), 1000); // Delay hiding after fade-out
            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(timer);
            }; // Cleanup timeout if component unmounts or `showPage` changes
        } else {
            setIsHidden(true);
        }
    }, [showPage]);

    return (
        <section
            className={`hero__page flex-column container 
            ${isFading ? "fade-in" : "fade-out"}
            ${isHidden ? "hidden fade-out" : ""}`}
        >
            <div className="hero__content-wrapper flex-row">
                <div className="slider__wrapper">
                    <Slider slidesToShow={selectedProduct.imgs}></Slider>
                </div>
                <div className="hero__content flex-column">
                    <div className="hero__header flex-column">
                        <h2 className="hero__product-name">
                            {selectedProduct.nameVisible}
                        </h2>
                        <div className="hero__product-ratingbox flex-row">
                            <span className="hero__product-stars">★★★★★</span>
                            <span className="hero__product-ratings">
                                4.8 (1007)
                            </span>
                        </div>
                        <div className="hero__product-pricebox flex-row">
                            <span className="price-new">{data.priceNew}</span>
                            <span className="price-old">
                                {selectedProduct.priceOld}
                            </span>
                        </div>
                    </div>
                    <div className="hero__colors">
                        <h3 className="hero__colors-title">
                            {data.bundlesText}
                        </h3>
                    </div>
                    <div className="selection__holder flex-row">
                        {data.products.map((product) => {
                            const isSelected =
                                product.name === selectedProduct?.name;
                            return (
                                <button
                                    className={`selector__button ${
                                        isSelected
                                            ? "selector__button-selected"
                                            : ""
                                    }`}
                                    key={product.name}
                                    onClick={() => {
                                        handleProductSelection(product.name);
                                    }}
                                >
                                    {product.nameVisible}
                                </button>
                            );
                        })}
                    </div>
                    <button onClick={buyHandler} className={`checkout__button`}>
                        {data.checkoutButton}
                    </button>
                </div>
            </div>

            <DropdownContainer
                selectedProduct={selectedProduct}
            ></DropdownContainer>
        </section>
    );
}
