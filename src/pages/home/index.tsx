import React, { useState, useEffect } from 'react';
import { Text, View, Image, Switch } from '@ray-js/ray';
import { NavBar } from '@ray-js/smart-ui';
import { useActions, useProps } from '@ray-js/panel-sdk';
import Res from '@/res';
import Strings from '@/i18n';
import styles from './index.module.less';
import { ErrorPopup } from '@/components/ErrorPopup';
import { ModelPopup } from '@/components/ModelPopup';
import { Slider } from '@/components/Slider';

export function Home() {
  const dpActions = useActions();
  const switchDp = useProps(props => props.switch);
  const tempSetDp = useProps(props => props.temp_set);
  const tempCurrentDp = useProps(props => props.temp_current);
  const countdownLeft = useProps(props => props.countdown_left);
  const countdownSetDp = useProps(props => props.countdown_set);
  const countdownDpObj = {
    cancel: 0,
    '1h': 1,
    '2h': 2,
    '3h': 3,
    '4h': 4,
    '5h': 5,
    '6h': 6,
    '7h': 7,
    '8h': 8,
    '9h': 9,
    '10h': 10,
    '11h': 11,
    '12h': 12,
    '13h': 13,
    '14h': 14,
    '15h': 15,
  };
  const countdownDpArr = [
    'cancel',
    '1h',
    '2h',
    '3h',
    '4h',
    '5h',
    '6h',
    '7h',
    '8h',
    '9h',
    '10h',
    '11h',
    '12h',
    '13h',
    '14h',
    '15h',
  ];

  const childLock = useProps(props => props.child_lock);
  const display = useProps(props => props.display);
  const fault = useProps(props => props.fault);
  const model = useProps(props => props.mode);

  // 开关
  const handleChangeSwitch = () => {
    const val = !switchDp;
    dpActions.switch.set(val);
  };

  // 温度设置
  const [tempSet, setTempSet] = useState(tempSetDp);
  const handlechangingTempSet = val => {
    setTempSet(val);
  };

  const handlechangeTempSet = val => {
    dpActions.temp_set.set(val);
  };

  // 定时设置
  const [countdownSet, setCountdownSet] = useState(countdownDpObj[countdownSetDp]);
  const handleChangeingCountdownSet = val => {
    setCountdownSet(val);
  };
  const handleChangeCountdownSet = val => {
    dpActions.countdown_set.set(countdownDpArr[val]);
  };

  // 模式设置
  const modelList = [
    {
      label: Strings.getLang('model1'),
      value: 'yure',
      icon: Res.warmIcon,
      activeIcon: Res.warmActiveIcon,
    },
    {
      label: Strings.getLang('model2'),
      value: 'shuim',
      icon: Res.sleepIcon,
      activeIcon: Res.sleepActiveIcon,
    },
    {
      label: Strings.getLang('model3'),
      value: 'chuman',
      icon: Res.destroyIcon,
      activeIcon: Res.destoryActiveIcon,
    },
    {
      label: Strings.getLang('model4'),
      value: 'hongbei',
      icon: Res.bakeIcon,
      activeIcon: Res.bakeActiveIcon,
    },
  ];

  const [showModel, setShowModel] = useState(false);
  let modelText = '';
  modelList.forEach(item => {
    if (item.value === model) {
      modelText = item.label;
    }
  });

  const [selectModel, setSelectModel] = useState('putong');
  const handleChangeModel = val => {
    if (!switchDp) return;
    if (val === model) {
      dpActions.mode.set('putong');
      return;
    }
    setSelectModel(val);
    setShowModel(true);
  };

  const confirmChumanModel = () => {
    dpActions.mode.set(selectModel);
    setShowModel(false);
  };
  const cancelChumanModel = () => {
    setShowModel(false);
  };

  // 息屏设置
  const handleChangeDisplay = () => {
    if (!switchDp) return;
    const val = !display;
    console.log('val ---', val, display);
    dpActions.display.set(val);
  };

  // 童锁设置
  const handleChangeChildLock = () => {
    if (!switchDp) return;
    const val = !childLock;
    dpActions.child_lock.set(val);
  };

  const [showError, setShowError] = useState(fault !== 0 && fault !== 256);

  const changeCountdown = (val: number) => {
    if (val >= 60) {
      return `${Math.floor(val / 60)}小时${val % 60}分`;
    }
    return `${val}分`;
  };

  useEffect(() => {
    setTempSet(tempSetDp);
  }, [tempSetDp]);

  useEffect(() => {
    setCountdownSet(countdownDpObj[countdownSetDp]);
  }, [countdownSetDp]);

  useEffect(() => {
    setShowError(fault !== 0 && fault !== 256);
  }, [fault]);

  return (
    <View className={`${styles.container} ${!switchDp ? styles.containerDisabled : ''}`}>
      <NavBar
        title={Strings.getLang('titleHome')}
        placeholder
        customStyle={{ backgroundColor: 'transparent' }}
        border={false}
      />
      <View className={styles.gearStatus}>
        <View className={`${styles.gearBox} ${!switchDp ? styles.gearBoxDisabled : ''}`}>
          <View className={styles.gearShow}>
            <Text className={styles.gearNum}>{switchDp ? tempCurrentDp : '--'}</Text>
            <Text className={styles.gearUnit}>{Strings.getLang('gearUnit')}</Text>
          </View>
          <View
            className={`${styles.modelShowBox} ${
              modelText !== '' && switchDp ? '' : styles.modelShowBoxDisabled
            }`}
          >
            <Text className={styles.modelText}>{modelText}</Text>
          </View>
        </View>
      </View>
      <View className={styles.remainingTimeBox}>
        <View className={styles.timeItem}>
          {switchDp ? (
            <Text className={styles.timeNum}>
              {childLock ? Strings.getLang('open') : Strings.getLang('close')}
            </Text>
          ) : (
            <Text className={styles.timeNum}>--</Text>
          )}
          <Text className={styles.timeText}>{Strings.getLang('childLock')}</Text>
        </View>
        <View className={styles.timeLine} />
        <View className={styles.timeItem}>
          <Text className={styles.timeNum}>
            {switchDp && countdownLeft > 0 ? changeCountdown(countdownLeft) : '--'}
          </Text>
          <Text className={styles.timeText}>{Strings.getLang('remainingTtime')}</Text>
        </View>
      </View>

      <View className={styles.card} style={{ marginTop: '46rpx' }}>
        {childLock && switchDp && <View className={styles.lockMask} />}
        <View className={styles.switchBox} onClick={handleChangeSwitch}>
          <Image
            className={styles.switchIcon}
            src={switchDp ? Res.switchActiveIcon : Res.switchIcon}
          />
          <Text className={styles.switchName}>
            {switchDp ? Strings.getLang('shutdown') : Strings.getLang('powerOn')}
          </Text>
        </View>
      </View>
      <View className={styles.card}>
        {(childLock || model !== 'putong') && switchDp && (
          <View className={styles.lockMask} />
        )}
        <View className={styles.gearSet}>
          <Slider
            title={Strings.getLang('gearSet')}
            disabled={!switchDp}
            unit={Strings.getLang('gearUnit')}
            value={switchDp ? tempSet : 20}
            min={20}
            max={65}
            step={1}
            onChanging={handlechangingTempSet}
            onChange={handlechangeTempSet}
          />
        </View>
      </View>
      <View className={styles.card}>
        {(childLock || model !== 'putong') && switchDp && (
          <View className={styles.lockMask} />
        )}

        <View className={styles.gearSet}>
          <Slider
            title={Strings.getLang('timeSet')}
            disabled={!switchDp}
            unit="H"
            value={switchDp ? countdownSet : 0}
            min={0}
            max={15}
            step={1}
            onChanging={handleChangeingCountdownSet}
            onChange={handleChangeCountdownSet}
          />
        </View>
      </View>
      <View className={styles.card}>
        {childLock && switchDp && <View className={styles.lockMask} />}

        <View className={styles.gearSet}>
          <View className={styles.gearItem}>
            <View className={styles.gearLabel}>
              <Text className={styles.gearName}>{Strings.getLang('sceneMode')}</Text>
            </View>

            <View className={styles.sceneModelList}>
              {modelList.map(item => (
                <View
                  className={styles.sceneModeItem}
                  onClick={() => handleChangeModel(item.value)}
                  key={item.value}
                >
                  <Image
                    className={styles.modelIcon}
                    src={model === item.value && switchDp ? item.activeIcon : item.icon}
                  />
                  <Text
                    className={`${styles.modelLabel} ${
                      item.value === model && switchDp ? styles.modelLabelActive : styles.modelLabel
                    }`}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View className={styles.card}>
        <View className={styles.gearSet}>
          <View className={styles.gearItem}>
            <View className={styles.gearLabel}>
              <Text className={styles.gearName}>{Strings.getLang('lightSet')}</Text>
            </View>
            <View className={styles.sceneLightList}>
              <View className={styles.sceneLightItem}>
                {childLock && switchDp && <View className={styles.lockMask} />}
                <View className={styles.block} onClick={handleChangeDisplay}>
                  <Image
                    className={styles.modelIcon}
                    src={display && switchDp ? Res.screenActiveIcon : Res.screenIcon}
                  />
                  <Text
                    className={`${styles.modelLabel} ${
                      display && switchDp ? styles.modelLabelActive : ''
                    }`}
                  >
                    {Strings.getLang('offScreen')}
                  </Text>
                </View>
              </View>
              <View className={styles.modelLine} />
              <View className={styles.childLock} onClick={handleChangeChildLock}>
                <View className={styles.childLockItem}>
                  <Image className={styles.lockIcon} src={switchDp && childLock ? Res.lockActiveIcon : Res.lockIcon} />
                  <Text className={`${styles.label} ${
                    childLock && switchDp ? styles.modelLabelActive : ''
                  }`}>{Strings.getLang('childLock')}</Text>
                </View>
                <view className={styles.des}> {Strings.getLang('childLockRemind')} </view>
              </View>
            </View>
          </View>
        </View>
      </View>
      {showError && <ErrorPopup fault={fault} />}
      {showModel && (
        <ModelPopup
          model={selectModel}
          onConfirm={confirmChumanModel}
          onCancel={cancelChumanModel}
        />
      )}
    </View>
  );
}

export default Home;
