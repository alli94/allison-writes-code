module.exports = function(eleventyConfig){
eleventyConfig.addPassthroughCopy("./src/styles.css");
eleventyConfig.addPassthroughCopy("./src/assets");
  return {
    dir: {
        input: "src",
        includes: "_includes",
        output: "public"
    }
  } ; 
}