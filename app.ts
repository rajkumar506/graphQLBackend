import express from "express";
import { graphqlHTTP } from "express-graphql";
const graphQLSchema =require("./schema/graphqlSchema")
// import graphQLSchema from"./schema/graphqlSchema"
// const graphqlHTTP =require('express-graphql')
const app=express();
const PORT = 3000;
app.use('/graphql',graphqlHTTP({
   schema:graphQLSchema,
   graphiql:true
}))
app.listen(PORT,()=>{
    console.log("hello server is running on ",PORT);
})