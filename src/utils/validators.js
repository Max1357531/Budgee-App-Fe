export function isValidHex(colour) {
    return /^#[0-9A-Fa-f]{6}$/.test(colour)
}