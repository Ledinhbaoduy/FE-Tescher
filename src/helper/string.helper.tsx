export class StringHelper {
    static getShortName = (name: string) => {
        if (name) {
            const firstChar = name.slice(0, 1).toUpperCase();
            const spaceIndex = name.indexOf(' ');
            const secondChar = spaceIndex !== -1 ? name.slice(spaceIndex, spaceIndex + 2).toUpperCase() : name.slice(1, 2).toUpperCase();
            let finalName = firstChar + secondChar;
            finalName = finalName.replace(' ', '');
            return finalName;
        }
        return '';
    }
}