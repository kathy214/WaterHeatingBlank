import { View, Image, Text } from '@ray-js/ray';
import React from 'react';
import styles from './index.module.less';
import Res from '@/res';
import Strings from '@/i18n';

function getErrorName(fault) {
  if (fault === 1) {
    return Strings.getLang('e1l');
  }
  if (fault === 2) {
    return Strings.getLang('e2l');
  }
  if (fault === 4) {
    return Strings.getLang('e4l');
  }
  if (fault === 8) {
    return Strings.getLang('fdl');
  }
  if (fault === 16) {
    return Strings.getLang('e1r');
  }
  if (fault === 32) {
    return Strings.getLang('e2r');
  }
  if (fault === 64) {
    return Strings.getLang('e4r');
  }
  if (fault === 128) {
    return Strings.getLang('fdr');
  }
}
function getErrorDes(fault) {
  if (fault === 4 || fault === 64) {
    return <Text className={styles.des}>{Strings.getLang('e4lDes')}</Text>;
  }
}

export const ErrorPopup = ({ fault }) => {
  return (
    <View className={styles.popup}>
      <View className={styles.content}>
        <Image className={styles.icon} src={Res.errorIcon} />
        <Text className={styles.name}>{getErrorName(fault)}</Text>
        {getErrorDes(fault)}
      </View>
    </View>
  );
};
