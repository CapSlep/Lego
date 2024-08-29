import { DataContext, useData } from "../DataContext";

export default function Footer() {
    const data = useData();

    return (
        <footer className="footer flex-column">
            <div className="footer__img-wrapper">
                <img src="./img/logo.png" alt="" />
            </div>
            <span className="footer__text">{data.footer}</span>
        </footer>
    );
}
