import { TaskCard } from "@fremtind/jkl-card-react";
import { FC, useState } from "react";

import "./SpeechBubble.scss";

export type Props = {
  message: string;
};

export const SpeechBubble: FC<Props> = ({ message }) => {
  const [speed] = useState(Math.random());

  return <p className="speech-bubble jkl-body">{message}</p>;
};
