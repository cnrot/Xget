#!/usr/bin/env node
/*
 * JavaScript Example: Render and serve the Cloudflare error page using Express server
 *
 * Prerequisites:
 *   npm install express cloudflare-error-page
 */

import express from 'express';
import { render as render_cf_error_page } from 'cloudflare-error-page';

const app = express();
const port = 3000;

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
  // Render the error page and send to client
  res.status(429).send(render_cf_error_page({
    "title": "Internal server error",
    "error_code": "429",
    "more_information": {
      "hidden": false,
      "text": "cloudflare.com",
      "link": "",
      "for": "more information"
    },
    "browser_status": {
      "status": "ok",
      "location": "You",
      "name": "Browser",
      "status_text": "Working"
    },
    "cloudflare_status": {
      "status": "error",
      "location": "San Francisco",
      "name": "Cloudflare",
      "status_text": "Error"
    },
    "host_status": {
      "status": "ok",
      "location": "Website",
      "name": "Host",
      "status_text": "Working"
    },
    "error_source": "cloudflare",
    "what_happened": "There is an internal server error on Cloudflare's network.",
    "what_can_i_do": "Please try again in a few minutes.",
    "perf_sec_by": {
      "text": "",
      "link": ""
    },
    "ray_id": (req.get('Cf-Ray') ?? '').substring(0, 16),
    "client_ip": req.get('X-Forwarded-For') || req.socket.remoteAddress
  }));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
