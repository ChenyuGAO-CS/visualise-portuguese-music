/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path")

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
})

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/"
})

// View is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
})

fastify.register(require("fastify-socket.io"))

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
let siteVisits = 0
fastify.get("/", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  // siteVisits = siteVisits + 1
  siteVisits++
  console.log("siteVisits:", siteVisits)
  
  if(request.headers["x-forwarded-for"]){
    const ip = request.headers['x-forwarded-for'].split(",")[0]
    console.log("ip:", ip)
  }
  
  let params = { seo: seo }

  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
})

/**
 * Our routes
 */
fastify.register(require('./server/change_piece'))


// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address){
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Your app is listening on ${address}`)
  }
)
