import { View, FlatList } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'

import styles from './feed.styles'
import ShortSingle from '../video/ShortSingle'

import { getAllShortsOfUser, getUnverifiedShorts, getVerifiedShorts } from '../../../../api/short'
import { useUserStore } from '../../../../store'

const USER_ID = '646ef3637251a0220e25132a'

const Feed = () => {
  const user = useUserStore((state) => state.user)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [shortOfUser, setShortOfUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [recommId, setRecommId] = useState('')

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const res = await getVerifiedShorts(user?.token)
      let res2 = []
      console.log('ROLE')
      console.log(user.user.role)
      if (user.user.role === 'AGED' || user.user.role === 'ADMIN  ') {
        res2 = await getUnverifiedShorts(user?.token)
      }
      const finalRes = [
        ...res.slice(0, 5),
        ...res2.slice(0, 1),
        ...res.slice(5, 10),
        ...res2.slice(1, 2),
        ...res.slice(10, 15),
        ...res2.slice(2, 3),
        ...res.slice(15, 20),
        ...res2.slice(3, 4),
        ...res.slice(20, 25),
        ...res2.slice(4, 5),
      ]

      if (finalRes) {
        setShortOfUser(finalRes)
        setRecommId(finalRes.recommId)
        setIsLoading(false)
        setError(false)
      } else {
        console.log('ERROR AT FEED')
        setIsLoading(true)
        setError(true)
      }
    }
    fetch()
  }, [])

  const mediaRefs = useRef([])
  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key].cell
      if (cell) {
        setCurrentIdx(() => mediaRefs.current[element.key].index)
        if (element.isViewable) {
          cell.play()
        } else {
          cell.stop()
        }
      }
    })
  })

  console.log(currentIdx)

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View className='flex items-center justify-center' style={styles.short}>
          <ActivityIndicator animating color='white' size={80} className='absolute m-auto' />
        </View>
      ) : error ? (
        <View className='flex items-center justify-center' style={styles.errorContainer}>
          <Text variant='titleMedium' className='text-white'>
            Có lỗi xảy ra.
          </Text>
        </View>
      ) : shortOfUser.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          windowSize={6}
          removeClippedSubviews
          initialNumToRender={2}
          maxToRenderPerBatch={4}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 90,
          }}
          data={shortOfUser}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.short}>
                <ShortSingle
                  ref={(ShortSingleRef) => (mediaRefs.current[item._id] = { cell: ShortSingleRef, index })}
                  item={item}
                />
              </View>
            )
          }}
          keyExtractor={(item) => item._id}
          decelerationRate={'normal'}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text variant='titleMedium' className='text-white'>
            Không có video nào
          </Text>
        </View>
      )}
    </View>
  )
}

export default Feed
