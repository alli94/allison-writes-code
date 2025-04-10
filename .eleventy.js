const { DateTime} = require("luxon");

module.exports = function(eleventyConfig){
eleventyConfig.addPassthroughCopy("./src/styles.css");
eleventyConfig.addPassthroughCopy("./src/assets");
eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
eleventyConfig.addFilter("postDate", (dateObj) => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
})

  return {
    dir: {
        input: "src",
        includes: "_includes",
        output: "public"
    }
  } ; 
}