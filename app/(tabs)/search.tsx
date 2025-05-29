import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/searchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'


const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('')

  const {data: movies, loading: moviesLoading, error: moviesError, refetch: searchMovies,reset} = useFetch(()=>fetchMovies({query: searchQuery}), true)


  useEffect(()=>{
    const timeout = setTimeout(async()=>{
      if(searchQuery.trim()){
        await searchMovies()
      }else{
        reset()
      }
    }, 1000)
    return ()=>{
      clearTimeout(timeout)
    }
  },[searchQuery])


  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode='cover' />
      <FlatList
        data={movies?.results}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent:'center',
          gap:16,
          marginVertical:16
        }}
        contentContainerStyle={{paddingBottom:100}}
        ListHeaderComponent={
          <>
             <View className='w-full flex-col justify-center mt-20 items-center'>
                <Image source={icons.logo} className="w-12 h-10"  />
                <View className='my-3 mx-auto w-full rounded-full'>
                  <SearchBar 
                    onPress={()=>{}} 
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChangeText={(text:string)=>setSearchQuery(text)}
                  />
                </View>
              </View>
              { moviesLoading && (
                <ActivityIndicator size="large" color="#0000ff" className='my-3' />
              )}
              { moviesError && (
                // @ts-ignore
                <Text className='text-red-500 px-5 my-3'>Error: {moviesError.message}</Text>
              )}
              {!moviesLoading && !moviesError && searchQuery.trim() && movies?.results?.length > 0 && (
                 <Text className='text-xl text-white font-bold'>
                  Search Results for {' '}
                  <Text className='text-accent' >{searchQuery}</Text>

                 </Text>
              )}
          </>
        }
        scrollEnabled={true}
      />
    </View>
  )
}

export default Search

//  <View className='w-full flex-col justify-center mt-20 items-center'>
//                     <Image source={icons.logo} className="w-12 h-10"  />
//                     <View className='my-3 mx-auto w-full rounded-full'>
//                       <SearchBar onPress={()=>{}} placeholder="Search movies..." />
//                     </View>
//                   </View>