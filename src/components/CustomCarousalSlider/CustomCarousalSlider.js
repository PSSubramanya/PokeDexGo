import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import imagePaths from '../../constants/imagePaths';

// NOTE: In progress. Yet to be completed. Will be done soon.
const CustomCarousalSlider = ({
  bodyView,
  paginationStyle,
  sliderArrowStyle,
  sliderData,
  indexVal,
  setIndexVal,
  containerStyle,
}) => {
  const prevScrollPos = useRef(0);
  const paginationViewRef = useRef();

  const [scrollDirection, setScrollDirection] = useState('');
  const [tempcount, settempcount] = useState(0);
  const [scrollingOffsetValue, setScrollingOffsetValue] = useState(0);
  const [loader, setLoader] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

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
            keyExtractor={item => item?.id}
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
                          modalImageIndex === index
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

  const leftChevronIcon = modalImages => {
    return (
      <>
        {modalImages?.length >= 1 ? (
          <TouchableOpacity
            onPress={() => {
              if (modalImageIndex > 0) {
                const tempIndex = modalImageIndex - 1;
                setModalImageIndex(tempIndex);
                paginationViewRef.current.scrollToIndex({
                  animated: true,
                  index: tempIndex,
                });
                // leftButtonHandler(tempIndex, modalImages);
              }
            }}
            disabled={modalImageIndex > 0 ? false : true}>
            <Image
              source={imagePaths.leftChevronIcon}
              height={1}
              width={1}
              style={[
                styles.chevronIcon,
                {
                  opacity: modalImageIndex > 0 ? 1 : 0.5,
                },
              ]}
            />
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  const rightChevronIcon = modalImages => {
    return (
      <>
        {modalImages?.length >= 1 ? (
          <TouchableOpacity
            onPress={() => {
              if (modalImageIndex < modalImages.length) {
                const tempIndex = modalImageIndex + 1;
                setModalImageIndex(tempIndex);
                paginationViewRef.current.scrollToIndex({
                  animated: true,
                  index: tempIndex,
                });
                // rightButtonHandler(tempIndex, modalImages);
              }
            }}
            disabled={modalImageIndex < modalImages.length - 1 ? false : true}>
            <Image
              source={imagePaths.rightChevronIcon}
              height={1}
              width={1}
              style={[
                styles.chevronIcon,
                {
                  opacity: modalImageIndex < modalImages.length - 1 ? 1 : 0.5,
                },
              ]}
            />
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {leftChevronIcon(sliderData)}
            <FlatList
              data={sliderData}
              ref={paginationViewRef}
              keyExtractor={item => item}
              contentContainerStyle={containerStyle}
              horizontal={true}
              renderItem={bodyView}
              disableIntervalMomentum={true}
              pagingEnabled={true}
              scrollEnabled={false}
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
            {rightChevronIcon(sliderData)}
          </View>
          <View style={styles.paginationSection}>
            {paginationView(sliderData, paginationStyle)}
          </View>
        </>
      )}
    </>
  );
};
export default CustomCarousalSlider;
