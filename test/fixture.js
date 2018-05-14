
// This list must be in the correct sorting order
const VERSIONS = [
    // Implicit epoch of 0
    "1.0.dev456", "1.0a1", "1.0a2.dev456", "1.0a12.dev456", "1.0a12",
    "1.0b1.dev456", "1.0b2", "1.0b2.post345.dev456", "1.0b2.post345",
    "1.0b2-346", "1.0c1.dev456", "1.0c1", "1.0rc2", "1.0c3", "1.0",
    "1.0.post456.dev34", "1.0.post456", "1.1.dev1", "1.2+123abc",
    "1.2+123abc456", "1.2+abc", "1.2+abc123", "1.2+abc123def", "1.2+1234.abc",
    "1.2+123456", "1.2.r32+123456", "1.2.rev33+123456",

    // Explicit epoch of 1
    "1!1.0.dev456", "1!1.0a1", "1!1.0a2.dev456", "1!1.0a12.dev456", "1!1.0a12",
    "1!1.0b1.dev456", "1!1.0b2", "1!1.0b2.post345.dev456", "1!1.0b2.post345",
    "1!1.0b2-346", "1!1.0c1.dev456", "1!1.0c1", "1!1.0rc2", "1!1.0c3", "1!1.0",
    "1!1.0.post456.dev34", "1!1.0.post456", "1!1.1.dev1", "1!1.2+123abc",
    "1!1.2+123abc456", "1!1.2+abc", "1!1.2+abc123", "1!1.2+abc123def",
    "1!1.2+1234.abc", "1!1.2+123456", "1!1.2.r32+123456", "1!1.2.rev33+123456",
];

const INVALID_VERSIONS = [
    // Non sensical versions should be invalid
    "french toast",

    // Versions with invalid local versions
    "1.0+a+",
    "1.0++",
    "1.0+_foobar",
    "1.0+foo&asd",
    "1.0+1+1",
    // not valid string,
    {},
    '',
    false,
    true,
    [],
    null,
    undefined,
    () => true,
];

module.exports = {
    VERSIONS,
    INVALID_VERSIONS,
    cross,
}

function cross(array, fn) {
    return [].concat(...array.map(fn));
}