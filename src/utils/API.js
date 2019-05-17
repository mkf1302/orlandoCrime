import axios from "axios";

export default {
  generalGET: function (zip) {
    // Send a GET request
    return axios({
      method: 'get',
      url: `https://data.cityoforlando.net/resource/6qd7-sr7g.json?status=Mapped`,
      data: {
        "$limit": 100,
        "$$app_token": "c3yOZVxKRLimWE0NGUyWd2Nxw",
      }
    })
  }
}