/**
 * 我的 - tab部分
 */

import React from 'react';
import Tabbar from '../../../components/Tabbar';
import {userInfoType} from '../../../types/types';

export default function UserTab({
  userData,
  setEventType,
  eventType,
}: {
  userData: userInfoType;
  setEventType: Function;
  eventType: string;
}) {
  const {likes_count, past_count, goings_count} = userData;
  const useraTabArr = [
    {
      text: `${likes_count} Likes`,
      type: 'liked',
    },
    {
      text: `${goings_count} Going`,
      type: 'going',
    },
    {
      text: `${past_count} Past`,
      type: 'past',
    },
  ];
  return (
    <Tabbar
      tabArr={useraTabArr}
      eventType={eventType}
      setEventType={setEventType}
    />
  );
}
