export function createElement(type, options = {}) {
    const element = document.createElement(type);

    Object.entries(options).forEach(([key, value]) => {

        if (key === 'class') {
            return value.forEach((className) => element.classList.add(className))
        }

        if (key === 'text') {
            return element.textContent = value;
        }
        return element.setAttribute(key, value);
    })
    return element;
}