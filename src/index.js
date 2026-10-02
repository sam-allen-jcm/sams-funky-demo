export default {
  async fetch(request, env) {
    const { results } = await env.DB.prepare(
      "SELECT id, name, role, vibe FROM crew ORDER BY id"
    ).all();

    const rows = results.map(function (r) {
      return "<tr><td>" + r.id + "</td><td>" + r.name + "</td><td>" + r.role + "</td><td>" + r.vibe + "</td></tr>";
    }).join("");

    const html = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Sam's Funky Demo</title>"
      + "<style>body{font-family:system-ui,sans-serif;margin:3rem auto;max-width:42rem}"
      + "table{border-collapse:collapse;width:100%}"
      + "th,td{text-align:left;padding:.6rem;border-bottom:1px solid #ddd}"
      + "th{background:#f4f4f4}</style></head><body>"
      + "<h1>Sam's Funky Demo GH TEST</h1>"
      + "<p>Live from D1. " + results.length + " crew members.</p>"
      + "<table><tr><th>ID</th><th>Name</th><th>Role</th><th>Vibe</th></tr>"
      + rows
      + "</table></body></html>";

    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }
};
