import { DataContext, useData } from "../DataContext";
import DropdownDescription from "./DropdownDescription";
import DropdownFeatures from "./DropdownFeatures";
import { useState } from "react";

export default function DropdownContainer({ selectedProduct }) {
    const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

    const toggleDropdown = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    return (
        <div className="drop__container">
            <DropdownFeatures
                isOpen={openDropdown === 1}
                onToggle={() => toggleDropdown(1)}
                selectedProduct={selectedProduct}
            ></DropdownFeatures>
        </div>
    );
}
