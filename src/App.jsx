import Facebook from "./modules/Facebook";
import Header from "./modules/Header";
import StarterPage from "./modules/StarterPage";
import Footer from "./modules/Footer";
import Notifications from "./modules/Notifications";
import GeneralPage from "./modules/GeneralPage";

import { useData } from "./DataContext"; // Import the custom hook
import { useState } from "react";

export default function App() {
    const data = useData();
    const [showQuiz, setShowQuiz] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(data.products[0]);

    function getUrl() {
        // Retrieve the macro from the button's data-attribute
        // const offerButton = document.querySelector(".checkout__button");

        let redirectLink = document.querySelector("#redirectLink").href;

        if (!redirectLink) {
            console.error("Offer link not found");
            return;
        }

        // Set parameters for redirection
        let adRedirectName = selectedProduct.nameVisible;
        let img_url = selectedProduct.imgs[0];

        // Send the fbq event
        fbq("track", "InitiateCheckout");

        // Check if the link already has parameters
        var separator = redirectLink.includes("?") ? "&" : "?";
        // Get the base URL of the current site
        let baseURL = window.location.origin;

        // Construct the full URL
        let fullImageUrl = new URL(img_url, baseURL).href;
        // Now you can encode the full URL if needed

        // Redirect with new parameters
        window.location.href =
            redirectLink +
            separator +
            "adRedirectName=" +
            encodeURIComponent(adRedirectName) +
            "&adRedirectImg=" +
            encodeURIComponent(fullImageUrl);
    }

    function buyHandler(event) {
        event.preventDefault();
        // Вызываем функцию getUrl для изменения URL и перенаправления
        getUrl();
    }

    function quizAnswerHandle() {
        setShowQuiz(false);
    }

    return (
        <>
            <Facebook></Facebook>
            <Notifications></Notifications>
            <Header></Header>
            <StarterPage
                showPage={showQuiz}
                quizFinishEvent={quizAnswerHandle}
            ></StarterPage>
            <GeneralPage
                showPage={!showQuiz}
                buyHandler={buyHandler}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
            ></GeneralPage>
            <Footer></Footer>
        </>
    );
}
