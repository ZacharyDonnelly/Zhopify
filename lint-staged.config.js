module.exports = {
  "app/ui/**/*.{js,jsx,ts,tsx}": [
    "yarn eslint --max-warnings=0",
    "yarn prettier -w",
  ],
  "**/*.{json,css,scss,md,webmanifest}": ["yarn prettier -w"],
};
