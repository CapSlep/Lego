import { useData } from "../DataContext";

export default function DropdownFeatures({
    isOpen,
    onToggle,
    selectedProduct,
}) {
    const data = useData();
    return (
        <div className="dropdown">
            <button className="dropdown__button" onClick={onToggle}>
                {data.descriptionName} {selectedProduct.nameVisible}
                <span className={`dropdown__icon ${isOpen ? "open" : ""}`}>
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>
            <div className={`dropdown__content ${isOpen ? "open" : ""}`}>
                <div className="dropdown__item flex-column">
                    <p className="dropdown__text">
                        {selectedProduct.descriptionText}
                    </p>
                </div>
            </div>
        </div>
    );
}
