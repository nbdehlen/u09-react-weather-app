import React, { useState, ReactNode } from 'react';

type ToggleEvent = React.KeyboardEvent<HTMLDivElement> & React.MouseEvent<HTMLDivElement>;

interface Props {
  children?: ReactNode;
  content?: ReactNode;
  toggledcontent?: ReactNode;
}

export const Toggle: React.FC<Props> = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const { children, content, toggledcontent } = props;

  const handleToggle = (event: ToggleEvent): void => {
    if (event.type === 'click') {
      setVisible(!visible);
    } else if (event.type === 'keydown') {
      const code = event.charCode || event.keyCode;
      // Space & Enter
      if (code === 32 || code === 13) {
        setVisible(!visible);
      }
    }
  };

  return (
    <div>
      <div
        className="cursor-pointer select-none rounded focus:outline-none focus:shadow-outline"
        onClick={handleToggle}
        onKeyDown={handleToggle}
        role="button"
        tabIndex={0}
      >
        {visible ? toggledcontent : content}
      </div>
      {!visible || children}
    </div>
  );
};
