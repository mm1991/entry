/**
 * 详情tab
 */

import React from 'react';
import Tabbar from '../../../components/Tabbar';

const DetailTabArr = [
  {
    text: 'Details',
    type: 'details',
  },
  {
    text: 'Participants',
    type: 'participants',
  },
  {
    text: 'Comments',
    type: 'comments',
  },
];

export default function DetailTab({
  show,
  eventType,
  setEventType,
}: {
  show: boolean;
  eventType: string;
  setEventType: Function;
}) {
  return (
    <Tabbar
      tabArr={DetailTabArr}
      show={show}
      eventType={eventType}
      setEventType={setEventType}
    />
  );
}
