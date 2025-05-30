import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/searchBar';
import TrendingCard from '@/components/TrendingCard';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchTrendingMovies } from '@/lib/appwrite';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()

  const {data: trendingMovies, loading: trendingMoviesLoading, error: trendingMoviesError} = useFetch(()=>fetchTrendingMovies(), true)
  const {data: movies, loading: moviesLoading, error: moviesError} = useFetch(()=>fetchMovies({query:""}), true)
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight: "100%"}} 
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        { moviesLoading || trendingMoviesLoading
          ? ( <ActivityIndicator size="large" color="#0000ff" className='mt-10 self-center' />)
          : moviesError || trendingMoviesError
          ? (
            //@ts-ignore 
            <Text>Error: {moviesError?.message || trendingMoviesError?.message}</Text> )
          : ( <View className="flex-1 px-5 w-full">
              <SearchBar 
                  onPress={()=>{router.push("/search")}}
                  placeholder="Search for a movie"
                />
                {trendingMovies && (
                  <View className='mt-10'>
                    <Text className='text-lg text-white font-bold mb-3'>Trending Movies</Text>
                    <FlatList
                      data={trendingMovies}
                      renderItem={({ item,index }) => (
                        <TrendingCard movie={item} index={index} />
                      )}
                      keyExtractor={(item) => item.movie_id.toString()}
                      // numColumns={3}
                      // columnWrapperStyle={{ 
                      //   justifyContent: "center",
                      //   gap:16,
                      //   paddingRight:5,
                      //   marginBottom:10 
                      // }}
                      ItemSeparatorComponent={() => <View className='w-4' />}
                      className='mb-4 mt-3'
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                )}
                <>
                  <Text className='text-lg text-white font-bold mt-5 mb-3'>Latest Movies</Text>
                  <FlatList
                    data={movies?.results}
                    renderItem={({ item }) => (
                      <MovieCard {...item} />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    columnWrapperStyle={{ 
                      justifyContent: "center",
                      gap:16,
                      paddingRight:5,
                      marginBottom:10 
                    }}
                    className='mt-2 pb-32'
                    scrollEnabled={false}
                  />
                </>
           </View> )
        }    
      </ScrollView>
    </View>
  );
}
