// TODO: make this html injection safe
module.exports = ({ secretary, group, url }) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        color: #333;
        font-family: Sans-Serif;
        max-width: 600px;
        margin: 50px;
      }
      a {
        color: #303090;
      }
      #container {
        padding: 25px;
        border: 1px solid #eee;
      }
      #cta {
        color: #fff;
        background-color: #FFCD53;
        width: auto;
        padding: 10px;
        text-align: center;
        margin-bottom: 10px;
      }
      #cta-plaintext {
        font-size: 10px;
        color: #ccc;
      }
    </style>
  </head>
  <body>
    <h1>TandaPay</h1>
    <div id="container">
      <h2>You've been invited to a group on TandaPay!</h2>
      <p>${secretary} has invited you to the group <a href="#">${group}</a>. You can accept this invitation by clicking the link below.</p>
      <a style="text-decoration: none" href="${url}"><div id="cta">Accept Invitation</div></a>
    </div>
  </body>
</html>
`