import { GraphQLObjectType,GraphQLString,GraphQLSchema } from 'graphql';
// const {GraphQLObjectType,GraphQLString} = graphql;
const BookType = new GraphQLObjectType({
    name:'book',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})
interface argsType{
    id:string
}
const book = new GraphQLObjectType({
    name:'BookType',
    fields:()=>({
        name:{type:GraphQLString},
        id:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})
const graphqlRootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{ type:BookType,
        args:{id:{type:GraphQLString}},
        resolve(parent:any,args:argsType){
            return "hello"
        }
    }
    }
})

module.exports= new GraphQLSchema({
    query:graphqlRootQuery
})