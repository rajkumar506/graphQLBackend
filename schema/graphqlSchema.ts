

const graphql = require("graphql")
// import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema,GraphQLFieldResolver } from 'graphql';
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema,GraphQLList,GraphQLID } = graphql
const _ = require("lodash")
// interface ArgsType {
//     id: string;
// }
const books = [
    {
        "id": "1",
        "name": "The Hobbit",
        "genre": "Fantasy",
        "authorID": '101'
    },
    {
        "id": "2",
        "name": "To Kill a Mockingbird",
        "genre": "Fiction",
        "authorID": '102'
    },
    {
        "id": "3",
        "name": "1984",
        "genre": "Dystopian",
        "authorID": '103'
    },
    {
        "id": "4",
        "name": "The Great Gatsby",
        "genre": "Classic",
        "authorID": '104'
    },
    {
        "id": "5",
        "name": "The Hobbit Second",
        "genre": "Fantasy",
        "authorID": '101'
    },
    {
        "id": "6",
        "name": "The Great Gatsby and Chances",
        "genre": "Classic",
        "authorID": '104'
    },
];
const authors = [
    {
        "id": '101',
        "name": "J.R.R. Tolkien",
        "age": 81
    },
    {
        "id": '102',
        "name": "Harper Lee",
        "age": 89
    },
    {
        "id": '103',
        "name": "George Orwell",
        "age": 46
    },
    {
        "id": '104',
        "name": "F. Scott Fitzgerald",
        "age": 44
    }
]


const BookObjectType = new GraphQLObjectType({
    name: 'BookType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId:{type: GraphQLID},
        author:{
            type: AuthorObjectType,
            resolve(parent:any,args:any){
                // console.log("my aprent",parent)
             return _.find(authors,{id:parent.authorID})
            }
        }
    })
});

// const AuthorObjectType = new GraphQLObjectType({
//     name: 'AuthorType',
//     fields: () => ({
//       id: { type: GraphQLString },
//       name: { type: GraphQLString },
//       book: { type: BookObjectType },
//     }),
//   });

const AuthorObjectType = new GraphQLObjectType({
    name: 'AuthorType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{
            type: GraphQLList(BookObjectType),
            resolve(parent:any,args:any){
                console.log("my Parent Id",parent)
                return _.filter(books,{authorID:parent.id})
            }
        }
    }),
});

const rootQueryResolver = (parent: any, args: any) => {
    // Ensure that 'args' has the 'id' property
    // console.log("args", args)
    const { id } = args;

    // Your resolver logic here
    return _.find(books, { id: id })
};

const graphqlRootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookObjectType,
            args: { id: { type: GraphQLID } },
            //   resolve:rootQueryResolver
            resolve(parent: any, args: any) {
                // console.log("args", args)
                const { id } = args;

                // Your resolver logic here
                return _.find(books, { id: id })
            }

        },

        author: {
            type: AuthorObjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent: any, args: any) {
                 console.log("hello rajkumar",args)
                return _.find(authors, { id: args.id })
            }
        },

        books:{
            type: new GraphQLList(BookObjectType),
            resolve(parent:any){
                return books
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: graphqlRootQuery
});

// export default schema;
