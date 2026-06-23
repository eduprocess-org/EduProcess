// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Bloquea explícitamente que Metro intente resolver node:sea o externals en Windows
config.resolver.unstable_enablePackageExports = false;

module.exports = config;