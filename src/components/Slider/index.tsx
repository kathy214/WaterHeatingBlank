import { View, Text, Button, Slider as RaySlider } from '@ray-js/ray';
import React, { useEffect, useState, useRef } from 'react';
import styles from './index.module.less';

interface IProps {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  unit: string;
  disabled: boolean;
  onChange: (val: number) => void;
  onChanging: (val: number) => void;
}

export const Slider = (props: IProps) => {
  const { value, min, max, step, title, unit, disabled, onChange, onChanging } = props;
  const [val, setVal] = useState(value);
  const timer = useRef(null);
  const asyncTimer = useRef(null);
  const submitTimer = useRef(null);
  const ayncDisable = useRef(null);

  // const handleReduceTouchStart = () => {
  //   if (disabled) return;
  //   asyncTimer.current && clearTimeout(asyncTimer.current);
  //   ayncDisable.current = true;
  //   if (val === min) {
  //     return;
  //   }
  //   setVal(val => {
  //     onChanging(val - step);
  //     return val - step;
  //   });

  //   timer.current = setInterval(() => {
  //     setVal(val => {
  //       if (val === min) {
  //         return val;
  //       }
  //       onChanging(val - step);
  //       return val - step;
  //     });
  //   }, 100);
  // };

  // const handleReduceTouchEnd = () => {
  //   if (disabled) return;
  //   timer.current && clearInterval(timer.current);
  //   handlChange();
  // };
  // const handlePlusTouchStart = () => {
  //   if (disabled) return;
  //   asyncTimer.current && clearTimeout(asyncTimer.current);
  //   ayncDisable.current = true;
  //   if (val === max) {
  //     return;
  //   }
  //   setVal(val => {
  //     onChanging(val + step);
  //     return val + step;
  //   });
  //   onChanging(val);
  //   timer.current = setInterval(() => {
  //     setVal(val => {
  //       if (val === max) {
  //         return val;
  //       }
  //       onChanging(val + step);
  //       return val + step;
  //     });
  //   }, 100);
  // };
  // const handlePlusTouchEnd = () => {
  //   if (disabled) return;
  //   timer.current && clearInterval(timer.current);
  //   handlChange();
  // };
  const handleReduce = () => {
    ayncDisable.current = true;
    setVal(val => {
      if (val === min) {
        return val;
      }
      onChanging(val - step);
      handlChange(val - step);
      return val - step;
    });
  };
  const handlePlus = () => {
    ayncDisable.current = true;
    setVal(val => {
      if (val === max) {
        return val;
      }
      onChanging(val + step);
      handlChange(val + step);
      return val + step;
    });
  };

  const handlChange = sendVal => {
    console.log('handlChange', sendVal);
    submitTimer.current && clearTimeout(submitTimer.current);
    submitTimer.current = setTimeout(() => {
      onChange(sendVal);
      asyncTimer.current = setTimeout(() => {
        ayncDisable.current = false;
      }, 2000);
    }, 300);
  };
  const onChangeSider = e => {
    ayncDisable.current = true;
    onChange(e.value);
    setVal(e.value);
    handlChange(e.value);
  };
  const onChangingSider = e => {
    ayncDisable.current = true;
    setVal(e.value);
    onChanging(e.value);
    handlChange(e.value);
  };
  let valueWidth = '0px';
  if (disabled) {
    valueWidth = '0px';
  } else if (val === min) {
    valueWidth = '0px';
  } else if (val > min && val < max) {
    valueWidth = `${((val - min) / (max - min)) * 193}px`;
  } else if (val === max) {
    valueWidth = '100%';
  }
  useEffect(() => {
    if (!ayncDisable.current) {
      setVal(value);
    }
  }, [value]);
  return (
    <View className={styles.sliderBox}>
      <View className={styles.label}>
        <Text className={styles.name}>{title}</Text>
        <Text className={styles.line} />
        <Text className={styles.num}>
          {val} {unit}
        </Text>
      </View>
      <View className={styles.slider}>
        <Button
          className={`${styles.reduceBtn} ${disabled && styles.reduceBtnDisabled}`}
          disabled={disabled}
          onClick={handleReduce}
          // onTouchStart={handleReduceTouchStart}
          // onTouchEnd={handleReduceTouchEnd}
        />

        <View className={styles.content}>
          <Text className={`${styles.min} ${val > min && !disabled ? styles.minActive : ''}`}>
            {min}
          </Text>
          <View className={styles.valueBox}>
            <View
              style={{
                width: '18px',
                backgroundColor: val > min && !disabled ? '#fe8630' : '#e7e7e7',
              }}
            />
            <View className={styles.value} style={{ width: valueWidth }} />
            <View
              style={{
                width: '18px',
                backgroundColor: val === max && !disabled ? '#fe8630' : '#e7e7e7',
              }}
            />
          </View>
          <View className={styles.raySlider}>
            <RaySlider
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              value={disabled ? min : val}
              activeColor="transparent"
              backgroundColor="transparent"
              onChange={onChangeSider}
              onChanging={onChangingSider}
            />
          </View>
          <Text className={`${styles.max} ${val === max && !disabled ? styles.maxActive : ''}`}>
            {max}
          </Text>
        </View>
        <Button
          className={`${styles.plusBtn} ${disabled && styles.plusBtnDisabled}`}
          disabled={disabled}
          onClick={handlePlus}
          // onTouchStart={handlePlusTouchStart}
          // onTouchEnd={handlePlusTouchEnd}
        />
      </View>
    </View>
  );
};
