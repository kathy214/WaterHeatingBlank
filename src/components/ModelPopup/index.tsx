import { View, Text } from '@ray-js/ray';
import React from 'react';
import styles from './index.module.less';
import Strings from '@/i18n';

interface IProps {
  model: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModelPopup = (props: IProps) => {
  const { model, onConfirm, onCancel } = props;
  const modelObj = {
    yure: {
      title: Strings.getLang('openPreheat'),
      remind: Strings.getLang('openPreheatRemind'),
    },
    shuim: {
      title: Strings.getLang('openSleep'),
      remind: Strings.getLang('openSleepRemind'),
    },
    chuman: {
      title: Strings.getLang('openChuMan'),
      remind: Strings.getLang('openChuManRemind'),
    },
    hongbei: {
      title: Strings.getLang('openHongbei'),
      remind: Strings.getLang('openHongbeiRemind'),
    },
  };
  const { title } = modelObj[model];
  const { remind } = modelObj[model];

  return (
    <View className={styles.popup}>
      <View className={styles.content}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.remind}>{remind}</Text>
        <View className={styles.btns}>
          <View className={`${styles.btn} ${styles.cancel}`} onClick={onCancel}>
            <Text className={styles.text}>{Strings.getLang('cancel')}</Text>
          </View>
          <View className={`${styles.btn} ${styles.confirm}`} onClick={onConfirm}>
            <Text className={styles.text}>{Strings.getLang('confirm')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
