module.exports = {
  purge: ["./src/pages/**/*", "./src/components/**/*"],
  content: ["./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
