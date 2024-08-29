import { DataContext, useData } from "../DataContext";
import { useEffect, useState } from "react";

import Quiz from "./Quiz";

export default function StarterPage({ showPage, quizFinishEvent }) {
    const [isHidden, setIsHidden] = useState(false);
    const data = useData();

    useEffect(() => {
        if (showPage) {
            setIsHidden(false); // Show immediately when `showPage` is true
        } else {
            const timer = setTimeout(() => setIsHidden(true), 500); // Delay hiding after fade-out
            return () => clearTimeout(timer); // Cleanup timeout if component unmounts or `showPage` changes
        }
    }, [showPage]);

    return (
        <section
            className={`quiz__page page container flex-column ${
                showPage ? "fade-in" : "fade-out"
            } ${isHidden ? "hidden" : ""}`}
        >
            <div className="quiz__logo-wrapper">
                <img src="./img/logo.png" alt="LEGO LOGO" loading="lazy" />
            </div>
            <h2 className="quiz__title">{data.quizPage.title}</h2>
            <p className="quiz__selling">
                {data.quizPage.textSelling}{" "}
                <span className="price-new">{data.priceNew}</span>
            </p>
            <div className="quiz__texts flex-column">
                {data.quizPage.texts.map((text, index) => {
                    return (
                        <p key={index} className="quiz__text">
                            {text}{" "}
                            <span className="price-new">{data.priceNew}</span>
                        </p>
                    );
                })}
            </div>
            <div className="quiz__img-wrapper">
                <img src="./img/land.jpg" alt="PROMOTION" loading="lazy" />
            </div>
            <p className="quiz__selling">{data.quizPage.initiationText}</p>
            <Quiz
                quizData={data.quizPage.quiz}
                quizFinishEvent={quizFinishEvent}
            ></Quiz>
        </section>
    );
}
