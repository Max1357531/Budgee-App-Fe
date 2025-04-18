import axios from "axios";

const api = axios.create({
  baseURL: "https://budgee-be.onrender.com/api/",
});


export const getExpenses = () => {
    return api.get("/expenses").then(({data}) => {
        console.log(data)
      return data;
    });
  };
export const getCategories = () => {
    return api.get("/categories").then(({data:{categories}}) => {
        console.log(categories)
      return categories;
    });
  };

  getExpenses()
  getCategories()