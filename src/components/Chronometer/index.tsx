import Button from "../Button";
import Clock from "./Clock";
import style from './Chronometer.module.scss'
import { Itask } from "../../types/task";
import { useState, useEffect } from 'react'
import { timeToSeconds } from "../../common/utils/time";

interface Props {
  selected: Itask | undefined
  endTask: () => void
}

export default function Chronometer({ selected, endTask }: Props) {

  const [time, setTime] = useState<number>()

  useEffect(() => {
    if(selected?.time){
      setTime(timeToSeconds(selected.time))
    }
  },[selected])

  function regressive(counter: number = 0) {
    setTimeout(() => {
      if(counter > 0) {
        setTime(counter - 1);
        return regressive(counter - 1);
      }
      endTask()
    }, 1000)
  }

  return (
    <div className={style.chronometer}>
      <p className={style.title}>Choose a card and start the chronometer</p>
      <div className={style.clockWrapper}>
        <Clock time={time} />
      </div>
      <div>
        <Button onClick={() => regressive(time)}>
          Start
        </Button>
      </div>
    </div>
  )
}