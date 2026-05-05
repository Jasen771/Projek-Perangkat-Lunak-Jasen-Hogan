function validateItem({ name, stock }) {
    if (!name || name.trim() === '') {
        return false;
    }

    if (typeof stock !== 'number' || stock < 0) {
        return false;
    }

    return true;
}

module.exports = { validateItem };