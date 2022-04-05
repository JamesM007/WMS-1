export const Toast = (message) => {
    let toast = document.getElementById("custom-toast");
    toast.innerText = message;
    toast.style.display = "";
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
};

export const generateID = (prefix, length = 14) => {
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    let charactersLength = characters.length;
    for (let i = 0; i < length; i++)
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    result = `_${prefix}-${result}`;
    return result;
};
