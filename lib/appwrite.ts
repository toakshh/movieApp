import { Client, Databases, ID, Query } from "react-native-appwrite";

//track the searches made by user


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setPlatform('com.moviemania.app')


const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    //if doucment is found , update it and increment the searchCount
    //if no document, create a new one and set searchCount to 1 in appwrite db
    try{

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            // @ts-ignore
            Query.equal('searchTerm', query)
        ])
        
        console.log(result)
        //check if a record of that search has already been store 
        if(result.documents.length > 0){
            const existingMovie = result.documents[0]
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
                count: existingMovie.count + 1
            })
        }else{
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(),{
                searchTerm: query,
                count: 1,
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            })
        }
    }catch(err:any){
        console.log(err)
        throw new Error('Failed to update search count', err.message)
    }
}

export const fetchTrendingMovies = async() : Promise<TrendingMovie[] | undefined >=>{
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc('count')
        ])
        return result.documents as unknown as TrendingMovie[]
    }catch(err:any){
        console.log(err)
        // throw new Error('Failed to fetch trending movies', err.message)
        return undefined
    }
}