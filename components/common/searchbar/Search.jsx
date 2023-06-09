import { View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'


const Search = () => {

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className="absolute z-10 right-0 left-0 top-0 pt-3">
      <Searchbar
        inputMode='text'
        inputStyle={{
          color: 'white',
          paddingBottom: 12
        }}
        className="bg-transparent border-2 border-white h-12 mx-3"
        placeholder='Tìm kiếm'
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        fontSize={16}
        iconColor='white'
        placeholderTextColor='white'
      />
    </View>
  )
}

export default Search