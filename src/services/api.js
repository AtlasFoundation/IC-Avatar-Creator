import bones from "../library/bones";
import templates from "../data/base_models";
import modelTraits from '../data/model_traits';
export const apiService = {
    fetchBones,
    filterElements,
    fetchTemplate,
    fetchTraitsByCategory
};
async function fetchTraitsByCategory(name) {
    const filtered = modelTraits.filter((trait) => trait.trait === name);
    return filtered[0];
}
async function fetchTemplate(id) {
    const filtered = templates.filter((templates) => templates.id === id);
    return filtered[0];
}
async function fetchBones() {
    return bones;
}
async function filterElements(search, elements, category) {
    if (elements && elements.length && category) {
        const value = search;
        const val = value.toString().toLowerCase();
        const valueArray = val.split(" ");
        if (value) {
            const filteredElementsData = elements.filter((item) => {
                return valueArray.every((eachKey) => {
                    if (!eachKey.length) {
                        return true;
                    }
                    return item.name.toString().toLowerCase().includes(eachKey);
                });
            });
            return {
                data: filteredElementsData,
            };
        }
    }
}
