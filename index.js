import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3002;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "thewebdevui";
const yourPassword = "hiIAMYURSS";
const yourAPIKey = "f567f50f-8acb-4774-8329-8881a5521c65";
const yourBearerToken = "088fa4e5-d5b3-4a98-93ce-5384a934ff4e";


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {

  try {
    const response = await axios.get(API_URL + "random");
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(404).send(error.message);
  };
  

});

app.get("/basicAuth",async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  
    try {
      const response = await axios.get(API_URL + "all?page=2",
        {},
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
       );
      res.render("index.ejs", { content: JSON.stringify(response.data) });
      axios.get(URL, {
        
      });
    } catch (error) {
      res.status(404).send(error.message);
    };
  
});

app.get("/apiKey", async (req, res) => {

  try {
    const response = await axios.get(API_URL + "filter?apiKey=" + yourAPIKey +"&score=5" );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(404).send(error.message);
  };
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async(req, res) => {

  try {
    const response = await axios.get(API_URL + "secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
