import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';

// NOTE: In progress. Yet to be completed. Will be done soon.
const CustomCarousalSlider = ({
  bodyView,
  paginationStyle,
  sliderArrowStyle,
  sliderData,
  indexVal,
  setIndexVal,
}) => {
  const prevScrollPos = useRef(0);
  const paginationViewRef = useRef();

  const [scrollDirection, setScrollDirection] = useState('');
  const [tempcount, settempcount] = useState(0);
  const [scrollingOffsetValue, setScrollingOffsetValue] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    prevScrollPos.current = scrollingOffsetValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollingOffsetValue]);

  useEffect(() => {
    // setLoader(true);  NOTE: May need to add this
    console.log('OFFSETINDEXABCD123 - 1', tempcount, tempcount / 2);
    const paginationIdVal = Math.ceil(tempcount / 2);
    setIndexVal(paginationIdVal);

    // NOTE: Do something to the below code and fix the glitch in the sliding
    // paginationViewRef.current.scrollToIndex({
    //   animated: true,
    //   index: paginationIdVal,
    // });

    // setLoader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempcount]);

  useEffect(() => {
    // setLoader(false); NOTE: May need to add this
  }, [indexVal]);

  let tempindexval = 0;

  const paginationView = (paginationData, paginationStyle) => {
    return (
      <>
        {paginationData?.length > 1 && paginationStyle ? (
          <FlatList
            data={paginationData}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.sliderStyle}
            renderItem={({item, index}) => {
              return (
                <View style={styles.paginationView}>
                  <View
                    style={[
                      styles.paginationDots,
                      {
                        backgroundColor:
                          indexVal === index
                            ? colors.vermillion
                            : colors.purple,
                      },
                    ]}
                  />
                </View>
              );
            }}
          />
        ) : null}
        {paginationData?.length > 1 && !paginationStyle ? (
          <TouchableOpacity
            onPress={() => {}}
            style={styles.paginationTextBorder}>
            <Text style={styles.paginationTextStyle}>
              <Text style={styles.paginationRichtext1}>{indexVal + 1} </Text>
              of
              <Text style={styles.paginationRichtext2}>
                {' '}
                {paginationData?.length}
              </Text>
            </Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  return (
    <>
      {loader ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={'large'} color={colors.purple} />
        </View>
      ) : (
        <>
          <FlatList
            data={sliderData}
            ref={paginationViewRef}
            keyExtractor={item => item}
            horizontal={true}
            renderItem={bodyView}
            disableIntervalMomentum={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            // onScroll={onScroll}
            onScroll={event => {
              const horizontalOffset = event.nativeEvent.contentOffset.x;
              console.log(
                'OFFSET VALUE',
                horizontalOffset,
                prevScrollPos.current,
              );
              setScrollingOffsetValue(horizontalOffset);
              if (prevScrollPos.current < horizontalOffset) {
                if (indexVal < sliderData.length - 1) {
                  tempindexval = tempcount + 1;
                  settempcount(tempindexval);
                }
              } else {
                if (indexVal > 0) {
                  tempindexval = tempcount - 1;
                  settempcount(tempindexval);
                }
              }
            }}
          />
          <View style={styles.paginationSection}>
            {paginationView(sliderData, paginationStyle)}
          </View>
        </>
      )}
    </>
  );
};
export default CustomCarousalSlider;
