export const fetchListData = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');

        if (!response.ok) {
            throw new Error("Failed to fetch list data");
        }

        const data = await response.json();
    
        return data.menu.map(item => ({
            ...item,
            image: fixImageUrl(item.image),
        })); 
    } catch (error) {
        console.warn(error);

        return [];
    }
};

const fixImageUrl = (imageFileName) => {
    if (!imageFileName) {
        return '';
    }

    return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;
};